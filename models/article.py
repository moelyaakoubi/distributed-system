from pydantic import BaseModel

class Article(BaseModel):
    IdentifiantProduit: int
    Zone: int
    EtatEmballage: str  # "Correct" or "Déformé"
    Responsable: int  # Reference to personnel ID
    Position: str  # Format "latitude,longitude"
    Rotation: str  # Format "angleX,angleY,angleZ"
    Collisions: int
