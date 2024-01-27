# Projektstatusbericht Nr. 2- Webanwendung für Notenverwaltung

**_Vinzent Schmid_**

**_Betreuer: Müslüm Atas_**

**Beschreibung:**

Ich arbeite an einer Webanwendung für die Notenverwaltung, die den aktuellen Anforderungen an eine plattformübergreifende und benutzerfreundliche Lösung gerecht wird. Die Entscheidung für Angular als Frontend-Framework und Asp.Net mit einer REST-API als Backend-Technologie ermöglicht mir nicht nur die Entwicklung einer leistungsfähigen Anwendung, sondern auch das Erlernen und Anwenden neuer Technologien.

Die Wahl einer SQL-Datenbank (SQL Workbench) basiert auf meiner Vertrautheit mit diesem Datenbanksystem. Ein Git-Repository, das mit Jira verknüpft ist, erleichtert die Versionskontrolle und bietet einen umfassenden Überblick über den Projektfortschritt.

**Erledigte Aufgaben und Offene Punkte:**

**Prototyp:**

- Prototyp erstellt und abgestimmt.
- Design für den Prototyp entwickelt.

**Datenbank:**

- ER-Modell erstellt und abgestimmt.
- Datenbank wurde erstellt und Beispieldaten eingefügt.

**Frontend:**

- Routing erfolgreich implementiert.
- Login Screen: Styling abgeschlossen, Login funktioniert (mittels Bearer Token / Refresh Token)
- Dashboard Screen: Grundlegende Umsetzung erfolgt, Responsiveness noch ausstehend.
- Classes Screen: Klassen werden gruppiert angezeigt.
  - Es werden nur die Klassen angezeigt, die für den Lehrer zugewiesen sind (offen)
- Profile Screen: Lehrerprofil-Anzeige und -Bearbeitung noch zu implementieren.
- Class Details:
  - Schüler/innen werden angezeigt.
  - Wechsel zwischen Winter- und Sommersemester implementiert.
  - Auswahl der Fächer und Tests/Checks umgesetzt.
  - Editmode funktioniert
  - Assignments werden angezeigt.
  - Berechung der Noten in Total noch offen

**Add Assignments Screen:**

- Logik abgeschlossen. Styling muss noch überarbeitet werden

**Backend:**

- Authentifizierung wurde implementiert mittels Identity Framework
- REST-API fast abgeschlossen (Get: Lehrer Endpunkt für Willkomensnachricht ist noch ausständig)

**Nächste Schritte:**

Mein nächstes Ziel ist das Projekt fertig zu machen. Dabei fehlt noch die Lehreranzeige mit der Begrüßungsnachricht und dass die Lehrer nur die zugewiesenen Klassen angezeigt bekommen. Zudem ist die Anwendung noch nicht vollständig responsive.

Ein weiterer Schritt und zugleich letzter Schritt wird die Projektdokumentation sein.

Git Repo:
https://github.com/VinzentSchmid/sms-satteins-notenverwaltung

Jira:
https://sms-satteins-notenverwaltung.atlassian.net/jira/software/projects/SMS/boards/1
