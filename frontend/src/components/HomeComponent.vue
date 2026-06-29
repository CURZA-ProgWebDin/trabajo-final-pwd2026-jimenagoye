<template>
  <section>
    <h2>Programación Web Dinámica</h2>

    <p>
      La Programación Web Dinámica es una forma de desarrollar aplicaciones web
      capaces de generar contenido en tiempo real según las acciones del
      usuario, los datos almacenados en una base de datos o las reglas de
      negocio definidas por el sistema.
    </p>

    <p>
      A diferencia de los sitios web estáticos, donde el contenido es siempre el
      mismo, las aplicaciones web dinámicas pueden personalizar la información
      mostrada, procesar formularios, gestionar usuarios, realizar consultas y
      actualizar datos de manera interactiva.
    </p>

    <p>
      Este tipo de desarrollo utiliza tecnologías del lado del servidor, como
      PHP, Python, Java o Node.js, junto con bases de datos como MySQL,
      PostgreSQL u Oracle. Además, suele complementarse con tecnologías del lado
      del cliente como HTML, CSS y JavaScript para mejorar la experiencia del
      usuario.
    </p>

    <p>
      La programación web dinámica es la base de la mayoría de las aplicaciones
      modernas, tales como redes sociales, sistemas de gestión, plataformas
      educativas, tiendas en línea y aplicaciones empresariales, permitiendo
      ofrecer servicios interactivos y adaptados a las necesidades de cada
      usuario.
    </p>
    <br />
    <hr />
    <br />
    <h2>¿Por qué utilizamos Vue.js y Flask?</h2>
    <br />
    <p>
      En el desarrollo de aplicaciones web modernas es común separar la interfaz
      de usuario del procesamiento de datos y la lógica de negocio. Para ello,
      utilizamos Vue.js en el frontend y Flask en el backend, aprovechando las
      fortalezas de cada tecnología.
    </p>
    <img
      src="https://cdn3d.iconscout.com/3d/free/thumb/free-vuejs-3d-icon-png-download-3640297.png?f=webp"
      alt="logo vuejs"
    />
    <img
      src="https://repository-images.githubusercontent.com/596892/21403b63-db85-4177-9553-ef6382a98bf1"
      alt="logo flask"
    />
    <p>
      <strong>Vue.js</strong> es un framework de JavaScript que permite
      construir interfaces de usuario interactivas, rápidas y fáciles de
      mantener. Gracias a su sistema de componentes y su reactividad, facilita
      la creación de aplicaciones dinámicas donde los cambios en los datos se
      reflejan automáticamente en la pantalla sin necesidad de recargar la
      página.
    </p>

    <p>
      <strong>Flask</strong> es un framework web para Python que se caracteriza
      por ser ligero, flexible y sencillo de utilizar. Permite desarrollar APIs
      y servicios web de manera eficiente, gestionando la lógica de negocio, la
      autenticación de usuarios, las conexiones con bases de datos y el
      procesamiento de la información.
    </p>

    <p>
      La combinación de Vue.js y Flask permite desarrollar aplicaciones
      siguiendo una arquitectura cliente-servidor, donde Vue.js se encarga de la
      presentación y la interacción con el usuario, mientras que Flask
      proporciona los datos y servicios necesarios mediante APIs. Esta
      separación mejora la organización del proyecto, facilita el mantenimiento
      y permite escalar cada parte de la aplicación de forma independiente.
    </p>
  </section>
</template>

<script setup></script>

<style scoped>
section {
  width: 1240px;
  margin: 0 auto;
  padding: 50px;
  height: 100%;
}
h2 {
  color: rgb(0, 255, 145);
}
p {
  text-align: justify;
  line-height: 35px;
}
ul {
  text-align: left;
  line-height: 40px;
}
img {
  height: 200px;
}
</style>