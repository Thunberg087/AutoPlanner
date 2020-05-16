# Project

## Setup the project

```
$ git clone https://github.com/Thunberg087/project.git
```
```
npm install
```
```
npm run serve
```

## Git Workflow
Jag tänker att vi kan använda Issues fliken för det uppgifterna som skall byggas. Här kan vi lägga in nya features som skall byggas och även buggar som behöver fixas. Vi kan även använda en automatiserad Kanban tavla som finns på GitHub. Som man hittar under fliken "Projects". Så om man hittar en bugg eller en ny feature som skall byggas/fixas så lägger man till en ny Issue. 

När man gör en ny Issue välj gärna, under fliken Labels, om det är en bugg eller ny feature och lägg även till projektet under Projects för att Issuen automatisk skall finnas i Kanban tavlan.


#### Branches 
En master och develop branch som alltid kommer finnas. Sedan bygga ut topic branches utifrån develop branchen, alltså för varje Issue så gör man en ny branch.

För varje sak som skall bygga, ändras eller raderas så skall en Issue skapas så varje branch kan referera till en Issue med en beskrivning. 

För att skapa en ny feature så skapar man en branch med namnet 'feature/#&lt;issue number>'
För att fixa en bug  så skapar man en branch med namnet 'bugfix/#&lt;issue number>'
 
#### Föra över koden till Develop branchen 
Pusha upp topic branchen till GitHub. Sedan göra ett pull request från topic branchen till develop (detta görs på GitHub). Sedan behöver pull requesten godkännas av en medlem i gruppen. 


## Git commands

### Starta dagen

#### Börja jobba på en ny Issue
Hitta en Issue i Kanban tavlan som man vill utveckla. Dra den till "In Progress" så att alla vet att någon har börjat utveckla den, så att inte flera personer jobbar på samma Issue.
```
$ git checkout develop
```
```
$ git pull
```
```
$ npm install
```
```
$ git checkout -b <feature/bugfix>/#<issue number>
```

#### Forsätta jobba på en Issue
```
$ git pull origin develop
```
```
$ npm install
```

### Sluta dagen

#### Issue inte klar
```
$ git add .
```
```
$ git commit -m "<beskrivande meddelande>"
```

#### Issue klar
```
$ git add .
```
```
$ git commit -m "<beskrivande meddelande>"
```
```
$ git pull origin develop 
```
```
$ npm install
```
Testa koden så den funkar tillsammans med den nya koden.
När någon har godkänt pull requestet kan du radera branchen lokalt med:
```
$ git branch -d <branch namn>
```

###### Om koden funkar utan problem:
```
$ git push --set-upstream origin <branch namn>
```
Sedan gå till GitHub klicka på "New pull request" välj master som base branch och din topic branch som compare branch.

###### Om koden inte funkar:

Fixa koden
```
$ git add .
```
```
$ git commit -m "<beskrivande meddelande>"
```
```
$ git push --set-upstream origin <branch namn>
```
Sedan gå till GitHub klicka på "New pull request" välj master som base branch och din topic branch som compare branch.

### Granska någons pull request

Öppna Kanban tavlan och dra över den Issuen du tänker granska till Review in progress.

##### Prova någons kod lokalt
```
$ git fetch
```
```
$ git checkout <feature/bugfix>/#<issue number>
```
Om allt ser bra ut godkänn pull requestet annars lägg en kommentar vad som behöver förbättras/ändras eller gör ändring själv och commita och pusha upp det i den topic branchen.

##### Gör ändring själv i någons pull request
```
$ git checkout <feature/bugfix>/#<issue number>
```
Gör ändringarna
```
$ git commit -m "<beskrivande meddelande>"
```
```
$ git push
```
