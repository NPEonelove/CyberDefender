from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import Optional
import logging
from transformers import AutoTokenizer, AutoModelForCausalLM

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Qwen API",
    description="API для взаимодействия с моделью Qwen",
    version="1.0.0"
)

# Модели данных
class PromptRequest(BaseModel):
    prompt: str
    max_tokens: Optional[int] = 512
    temperature: Optional[float] = 0.7

class PromptResponse(BaseModel):
    status: str
    prompt: str
    response: str

class ErrorResponse(BaseModel):
    error: str

class HealthResponse(BaseModel):
    status: str

# Глобальные переменные
tokenizer = None
model = None
model_loaded = False

@app.on_event("startup")
async def load_model():
    global tokenizer, model, model_loaded
    
    try:
        logger.info("Попытка загрузки модели Qwen...")
        # Загружаем модель
        tokenizer = AutoTokenizer.from_pretrained(
            "Qwen/Qwen2.5-0.5B-Instruct",
            trust_remote_code=True
        )
        
        model = AutoModelForCausalLM.from_pretrained(
            "Qwen/Qwen2.5-0.5B-Instruct",
            device_map="auto",
            trust_remote_code=True
        )
        
        model_loaded = True
        logger.info("Модель успешно загружена!")
        
    except Exception as e:
        logger.error(f"Ошибка при загрузке модели: {e}")
        model_loaded = False

@app.post("/api")
async def handle_prompt(request: PromptRequest):
    try:
        if not model_loaded:
            return PromptResponse(
                status="success",
                prompt=request.prompt,
                response=f"Заглушка: Вы сказали '{request.prompt}'. Модель не загружена."
            )
        
        qwen_response = await generate_response(
            request.prompt, 
            request.max_tokens
        )
        
        return PromptResponse(
            response=qwen_response
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Произошла ошибка: {str(e)}"
        )

async def generate_response(prompt: str):
    try:
        messages = [
            {"role": "user", "content": prompt}
        ]
        
        inputs = tokenizer.apply_chat_template(
            messages,
            add_generation_prompt=True,
            tokenize=True,
            return_dict=True,
            return_tensors="pt",
        )
        
        # Генерируем ответ
        outputs = model.generate(
            **inputs,
            pad_token_id=tokenizer.eos_token_id,
        )
        
        # Декодируем ответ
        response = tokenizer.decode(
            outputs[0][inputs["input_ids"].shape[-1]:], 
            skip_special_tokens=True
        )
        
        return response.strip()
        
    except Exception as e:
        return f"Ошибка генерации: {str(e)}"

@app.get("/health")
async def health_check():
    status_msg = "Модель загружена" if model_loaded else "Модель не загружена (режим заглушки)"
    return HealthResponse(status=f"API работает. {status_msg}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)