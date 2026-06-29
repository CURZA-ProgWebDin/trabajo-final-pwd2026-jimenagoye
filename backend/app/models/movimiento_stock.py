from app.models import db
from app.models.base_model import BaseModel

class MovimientoStock(BaseModel):
    __tablename__ = 'movimientos_stock'
    
    tipo = db.Column(db.String(10), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False) 
    motivo = db.Column(db.String(200), nullable=True) 
    
    producto_id = db.Column(db.Integer, db.ForeignKey('productos.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='movimientos')
    producto = db.relationship('Producto', back_populates='movimientos')

    def to_dict(self, incluye_producto=True, incluye_user=True):
        data = super().to_dict()
        data.update({
            'tipo': self.tipo,
            'cantidad': self.cantidad,
            'motivo': self.motivo,
            'producto_id': self.producto_id,
            'user_id': self.user_id,
        })
        
        if incluye_producto and self.producto:
            data.update({'producto': self.producto.to_dict(incluye_movimientos=False)})
        
        if incluye_user and self.user:
            data.update({'user': self.user.to_dict(incluye_movimientos=False)})
            
        return data