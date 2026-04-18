# Paso 1: Construir la aplicación
FROM maven:3.8.5-openjdk-17 AS build
# Esto le dice a Docker que trabaje dentro de la carpeta Inventario
WORKDIR /app
COPY Inventario/ . 
RUN mvn clean package -DskipTests

# Paso 2: Ejecutar la aplicación
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
# Copiamos el archivo .jar generado desde la etapa de build
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]