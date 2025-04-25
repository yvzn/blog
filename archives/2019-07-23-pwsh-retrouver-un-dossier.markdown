---
permalink: /2019/07/22/pwsh-retrouver-un-dossier.html
title: "Retrouver un sous-dossier avec Powershell"
date: 2019-07-23T00:00+01:00
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
---

<acronym title="En résumé... (Too long; Didn't Read)">TL;DR</acronym> `Get-ChildItem -Recurse`
permet de retrouver récursivement le chemin vers un fichier
ou un répertoire dans Powershell. On peut l'associer à
d'autres commandes afin d'exécuter des traitements sur
le résultat de la recherche.

<!--more-->

La commande suivante permet de retrouver rapidement les sous-répertoires du
répertoire courant dont le nom commence par "source"&nbsp;:

```powershell
Get-ChildItem -Recurse -Directory -Filter source*
```

`-Recurse` permet d'effectuer une recherche récursivement sur les sous-dossiers,
`-Directory` indique qu'on souhaite ne chercher que des répertoires
et `-Filter <pattern>` permet de filtrer les résultats à l'aide d'une
chaine de caractères.

Une fois qu'on a retrouvé le ou les répertoires, un pipe `|` suivi
de `ForEach-Object` permet de réaliser un traitement sur tous
les résultats. Par exemple pour afficher le chemin complet
de chaque résultat&nbsp;:

```powershell
Get-ChildItem -Recurse -Directory -Filter source* | ForEach-Object { Write-Host $_.FullName }
```

La combinaison que j'utilise souvent permet de trouver le premier
sous-répertoire avec le nom donné et de s'y déplacer&nbsp;:

```powershell
Get-ChildItem -Recurse -Directory -Filter source* | ForEach-Object { Set-Location $_.FullName; break }
```

L'instruction `break` est importante, elle permet d'arrêter la recherche
après le premier résultat, ce qui est une optimisation intéressante
dans mon cas.

En version *compacte*&nbsp;:

```powershell
gci -Recurse -Directory -Filter source* | % { cd $_.FullName; break }
```

Autre exemple, trouver le premier fichier `*.html` et de l'ouvrir avec
l'application associée&nbsp;:

```powershell
Get-ChildItem -Recurse -File -Filter *.html | ForEach-Object { Start-Process $_; break }
```

Pour réutiliser ces commandes ultérieurement, un raccourci peut être ajouté
dans le profil Powershell. Pour éditer son profil (par exemple avec VS Code)&nbsp;:

```powershell
code $PROFILE
```

Pour ajouter dans le fichier une fonction personnalisée:

```powershell
function Find-And-Set-Location
{
    Param($folder)
    Get-ChildItem -Recurse -Directory -Filter $folder | ForEach-Object { Set-Location $_.FullName; break }
}
```

Et enfin définir un alias vers cette fonction, plus simple à saisir:

```powershell
New-Alias ccd Find-And-Set-Location
```
