from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
from typing import List
from models.article import Article

# Définition du modèle pour représenter une personne
class Personne(BaseModel):
    nom: str
    age: int

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

# Ajout du middleware CORS pour permettre les requêtes cross-origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database connection
def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='projet_application_repartie',
        port=3308

    )
    return connection

# Endpoint pour récupérer tous les enregistrements de la table 'personnel'
@app.get("/personnel")
async def all():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM personnel')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows


# Endpoint pour compter les employés dans le service "ressources humaines"
@app.get("/count_personnel_rh")
async def count_personnel_rh():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT COUNT(*) as count FROM personnel WHERE service="ressources humaines"')
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    return {"count": result['count']}


# Endpoint pour récupérer tous les enregistrements de la table 'formations'
@app.get("/formations")
async def all():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM formations')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows

# Endpoint pour récupérer les formations liées aux ressources humaines
@app.get("/formations_rh")
async def formations_rh():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM formations WHERE sujet="ressources humaines"')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows

# Endpoint pour récupérer la formation RH avec le plus haut pourcentage d'engagement
@app.get("/forma_max_motivation")
async def get_max_motivation_formation():
    """
    Récupère la formation en ressources humaines avec le plus haut pourcentage d'engagement.
    """
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        query = (
            """
            SELECT NomFormation, PourcentageEngagement
            FROM formations 
            WHERE Sujet = %s AND PourcentageEngagement = (
                SELECT MAX(PourcentageEngagement) 
                FROM formations 
                WHERE Sujet = %s
            )
            """
        )
        sujet = "ressources humaines"
        cursor.execute(query, (sujet, sujet))
        rows = cursor.fetchall()
        
    except Exception as e:
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

    return rows


# Endpoint pour récupérer le nombre d'articles avec un emballage correct
@app.get("/nb_articles_emballage_correct")
async def get_articles_with_correct_packaging():
    """
    Récupère le nombre d'articles avec un emballage correct.
    """
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT COUNT(*) AS NombreArticles 
            FROM articleschainemontage 
            WHERE EtatEmballage = %s
        """
        etat = "Correct"
        cursor.execute(query, (etat,))
        rows = cursor.fetchall()
        
    except Exception as e:
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

    return rows

# Endpoint pour vérifier si des employés sont dans le service RH
@app.get("/has_personnel_rh")
async def has_personnel_rh():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT COUNT(*) as count FROM personnel WHERE service="ressources humaines"')
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    return {"has_personnel_rh": result['count'] > 0}


# Endpoint pour récupérer toutes les données des relevés sanitaires
@app.get("/relevessanitaires")
async def all():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM relevessanitaires')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows


# Endpoint pour trouver la température maximale par zone
@app.get("/relevessanitaires/max_temp")
async def max_temp():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT Zone, max(TemperatureAir) as max_temp FROM relevessanitaires')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows

# Endpoint pour récupérer tous les articles de la chaîne de montage
@app.get("/articleschainemontage")
async def all():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM articleschainemontage')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows

# Endpoint pour ajouter un nouvel article dans la chaîne de montage
@app.post("/articleschainemontage")
async def create_article(article: Article):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Requête d'insertion SQL
    query = '''
    INSERT INTO articleschainemontage 
    (IdentifiantProduit, Zone, EtatEmballage, Responsable, Position, Rotation, Collisions)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    '''
    data = (
        article.IdentifiantProduit,
        article.Zone,
        article.EtatEmballage,
        article.Responsable,
        article.Position,
        article.Rotation,
        article.Collisions
    )
    
    cursor.execute(query, data)
    connection.commit()
    cursor.close()
    connection.close()
    
    return {**article.dict()}  # Retourne l'article inséré


# Endpoint pour récupérer l'article avec le moins de collisions
@app.get("/Commercial/A")
async def less_collisions():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM articleschainemontage ORDER BY Collisions ASC LIMIT 1')
    article = cursor.fetchall()
    cursor.close()
    connection.close()
    return article


