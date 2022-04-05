Se trata de un backend construido para un ecommerce, con una especie de front
generado por motor de plantilla (ejs), con las posibilidades que este brinda.

Se comienza desde el login, con e-mail y password, si ya se cuenta con un
usuario generado en persitencia a utilizar. Si aun no tiene uno, se puede
generar en la seccion de registro.

Ambos procesos redirigiran al usuario a la seccion de productos, donde se puede
ver el catalogo, para copiar los ID de los productos que se quieren comprar.

Una vez elegidos, se pasa a la compra a traves de un boton que genera un
carrito. En esta parte, se obtiene el ID del mismo, que debera ser ingresado
junto con el ID de los productos que se quieran adquirir. Al presionar finalizar
compra, se puede visualizar el carrito con sus productos y terminar el
procedimiento oprimiendo el boton. Este ultimo lo llevara a ordenes, donde se
podra generar y guardar la orden final ingresando el ID del carrito.

Tambien se podra acceder al chat a traves del cual se pueden enviar mensajes,
guardarse y luego obtener los mismos filtrando por email.

Finalmente, tambien es posible modificar y eliminar productos via endpoints (sin
front generado).
