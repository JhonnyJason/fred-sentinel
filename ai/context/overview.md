# fred-sentinel Overview

A minimal FRED (Federal Reserve Economic Data) API client package designed for the sentinel-backend.

## Purpose

Provides a focused subset of FRED API functionality with built-in rate limiting and request deduplication.

## Architecture

- **Source**: `sources/source/` - CoffeeScript modules (flat hierarchy)
- **Output**: `output/` - Transpiled JavaScript files
- **Entry Point**: `index/index.coffee` exports the `FRED` class

## Modules

- **index** - Main `FRED` class exposing the API
- **request/throttledrequest** - Rate-limited HTTP client (2 req/sec with bursting)
- **request/request** - Base HTTP client with error handling
- **urlcreate** - FRED API URL builders
- **dataextraction** - Response data extractors
