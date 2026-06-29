from app.models import db
from app.models.base_model import BaseModel

class Categoria(BaseModel):
    __tablename__ = "categorias"
    nombre = db.Column(db.String(100), nullable=False, unique=True)
    descripcion = db.Column(db.Text, nullable=True)
    productos = db.relationship('Producto', back_populates='categoria')

    def to_dict(self, incluye_categoria=True):
        data = super().to_dict()
        data.update({
            'nombre': self.nombre,
            'descripcion': self.descripcion,
        })
        
        if incluye_categoria and self.productos:
            data.update({
                'productos': [producto.to_dict(incluye_categoria=False, incluye_movimientos =False) for producto in self.productos]
            })
            
        return data