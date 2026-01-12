# UthriX Portfolio

## Getting Started

1. Run `npm install`
2. Run `npm run dev`

## Job Applications API

Set `VITE_APPLICATION_API_URL` to a backend endpoint that accepts `multipart/form-data` for applications.

- Method: POST
- Fields: `jobId`, `fullName`, `email`, `phone`, `coverLetter` (optional), `portfolio` (optional), `resume` (file)

Example `.env` (create at project root):

```
VITE_APPLICATION_API_URL=https://your-api.example.com/applications
```

In development, if no endpoint is configured, submission will attempt to post to `/api/applications`. Configure a dev proxy or backend accordingly.
