#!/bin/bash

# Check the operating system
OS=$(uname -s)
case "$OS" in
    Linux*)     DATA_DIR=./db_data;;
    Darwin*)    DATA_DIR=./db_data;;
    CYGWIN*)    DATA_DIR=.\db_data;;
    MINGW*)     DATA_DIR=.\db_data;;
    *)          echo "Unsupported OS: $OS"; exit 1;;
esac

# Create the data directory if it doesn't exist
if [ ! -d "$DATA_DIR" ]; then
    mkdir $DATA_DIR
fi

# Start the containers in the background
docker-compose up -d

