<template>
  <div class="about-container">
    <div class="about-card">
      <h1>Acerca del Proyecto</h1>
      <p>
        Este sistema de gestión fue desarrollado para optimizar el control de movimientos de stock, 
        proveedores y productos.
      </p>
      <div class="info-section">
        <h3>Desarrollado por:</h3>
        <p><strong>Jimena</strong></p>
        <h3>Tecnologías:</h3>
        <ul>
          <li>Vue 3</li>
          <li>Flask</li>
          <li>MySQL</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container { padding: 40px; display: flex; justify-content: center; }
.about-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 500px; text-align: center; }
h1 { color: #2c3e50; margin-bottom: 20px; }
.info-section { margin-top: 30px; text-align: left; }
ul { list-style: none; padding: 0; }
li { padding: 5px 0; color: #7f8c8d; }
</style>