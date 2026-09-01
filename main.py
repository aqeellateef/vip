from fastapi import FastAPI, Response, HTTPException
import requests
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/proxy")
def proxy_stream(url: str):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://starzplay.com/",
        "Origin": "https://starzplay.com"
    }
    try:
        # إرسال الطلب مع الحفاظ على الروابط والرموز بدقة
        response = requests.get(url, headers=headers, stream=True, timeout=15)
        
        excluded_headers = ["content-encoding", "transfer-encoding", "connection"]
        response_headers = {
            name: value for name, value in response.raw.headers.items()
            if name.lower() not in excluded_headers
        }
        
        return Response(
            content=response.content, 
            status_code=response.status_code, 
            headers=response_headers,
            media_type=response.headers.get("content-type")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
