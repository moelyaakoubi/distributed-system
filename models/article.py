from pydantic import BaseModel

class Article(BaseModel):
    IdentifiantProduit: int
    Zone: int
    EtatEmballage: str  # "Correct" or "Déformé"
    Responsable: int  # Reference to personnel ID
    Position: str  # Format "latitude,longitude"
    Rotation: str  # Format "angleX,angleY,angleZ"
    Collisions: int

class Personnel(BaseModel):
    Identifiant: int  # Numéro de sécurité sociale
    NomPrenom: str  # Nom-Prénom
    Etat: str  # "actif", "repos", "arrêt maladie", "congé"
    Service: str  # "commercial", "finance et gestion", "ressources humaines", "juridique", "logistique", "assistance commerciale", "direction générale", "maintenance", "achats", "cyber sécurité", "recherche et développement", "informatique", "qualité", "collecte", "marketing", "industriel", "assistance technique", "analyse des données"
    FrequenceCardiaqueActuelle: int  # pulsations/min
    Position: str  # coordonnées GPS
