#!/bin/bash

# Run migrations (create tables)
# python seed.py # Optional: Run seed if you want a user created automatically

# Start the server
uvicorn app.main:app --host 0.0.0.0 --port 10000
