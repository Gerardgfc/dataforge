<p align="center">
  <img src="https://github.com/user-attachments/assets/97cce9d3-22e0-40dd-9ebb-6f6f0796fb0b" width="200">
</p>

# UGB_API: Detección de Fraudes Financieros con Machine Learning

## Descripción
UGB_API es una aplicación de programación de interfaces (API) diseñada para detectar transacciones financieras fraudulentas. Emplea un modelo de `GradientBoostingClassifier` entrenado en un conjunto de datos financieros para identificar patrones anómalos que puedan indicar actividad fraudulenta. La API recibe como entrada un archivo CSV con datos estructurados de transacciones y devuelve un archivo CSV con las predicciones correspondientes, clasificando cada transacción como "fraude" o "no fraude".

## Arquitectura y Funcionamiento
- **Preprocesamiento de Datos**: El modelo subyacente ha sido entrenado utilizando un conjunto de datos cuidadosamente seleccionado y preprocesado. Este proceso incluye la limpieza de datos, la transformación de variables y la ingeniería de características para optimizar el rendimiento del modelo.
- **Modelo de Machine Learning**: Se ha utilizado un modelo de `GradientBoostingClassifier` debido a su capacidad para capturar interacciones complejas entre las variables y su alto rendimiento en problemas de clasificación.
- **API RESTful**: La API expone un endpoint RESTful que permite a los clientes enviar solicitudes HTTP POST con los datos de entrada y recibir las predicciones en formato CSV.
