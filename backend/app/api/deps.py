import jwt
from app.core.config import settings
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import PyJWKClient

security = HTTPBearer()

CLERK_ISSUER_URL = settings.CLERK_ISSUER_URL

# 2. Setup the Key Client (This handles fetching & caching public keys)
# Only setup if URL is present to avoid crashing if you forget the env var
jwks_client = None
if CLERK_ISSUER_URL:
    jwks_client = PyJWKClient(f"{CLERK_ISSUER_URL}/.well-known/jwks.json")


def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    Validates the Clerk JWT Token and returns the User ID.
    Now verifies the cryptographic signature!
    """
    token = credentials.credentials
    try:
        # 1. Decode the token.
        if jwks_client:
            # PRODUCTION MODE:VERIFY SIGNATURE
            signing_key = jwks_client.get_signing_key_from_jwt(token)
            #
            payload = jwt.decode(
                token,
                signing_key.key,
                algorithms=["RS256"],
                audience=None,  # Clerk tokens often don't have aud claim by default
                options={"verify_exp": True},  # Ensure token isn't expired
            )
        else:
            # FALLBACK / DEV MODE (If you haven't set the env var yet)
            print(
                "⚠️ WARNING: Skipping Signature Verification (CLERK_ISSUER_URL not set)"
            )
            payload = jwt.decode(
                token, options={"verify_signature": False}, algorithms=["RS256"]
            )

        # Clerk stores the User ID in the 'sub' (Subject) field
        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid Token: No User ID")

        return user_id

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError as e:
        print(f"Auth Error: {e}")
        raise HTTPException(status_code=401, detail="Invalid Authentication Token")
    except Exception as e:
        print(f"Auth Error: {e}")
        raise HTTPException(status_code=401, detail="Authentication Failed")
