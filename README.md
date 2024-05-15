# Apache Kafka Demo

## Despliegue

Para levantar los contenedores:

```sh
docker compose up -d
```

# Uso

Para enviar peticiones al productor:

```sh
curl localhost:3000 -X POST -d value=[algún número]
```

Para enviar peticiones continuamente pueden usar el script `requests.sh`

```sh
bash requests.sh
```
