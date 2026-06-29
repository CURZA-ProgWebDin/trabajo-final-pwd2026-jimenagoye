from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Importamos los modelos acá para que 'app.models' los tenga disponibles
from .user import User
from .rol import Rol
from .categoria import Categoria
from .producto import Producto
from .proveedor import Proveedor