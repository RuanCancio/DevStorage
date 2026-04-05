#!/bin/sh
set -e

host="$1"
shift

# Variáveis de ambiente para psql
export PGPASSWORD=$POSTGRES_PASSWORD

# Espera até o Postgres aceitar conexões
until psql -h "$host" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q'; do
  echo "Esperando o Postgres em $host..."
  sleep 2
done

# Executa o comando final
exec "$@"