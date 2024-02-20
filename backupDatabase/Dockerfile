# Verwenden Sie das offizielle PostgreSQL-Image als Basis
FROM postgres:latest

# Setzen Sie das Passwort für den 'postgres'-Benutzer (ändern Sie dies entsprechend)
ENV POSTGRES_PASSWORD=password

# Kopieren Sie Ihre backup.sql-Datei ins Docker-Image
COPY backup.sql /docker-entrypoint-initdb.d/
