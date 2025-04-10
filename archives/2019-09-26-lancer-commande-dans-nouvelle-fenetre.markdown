---
permalink: /2019/09/25/lancer-commande-dans-nouvelle-fenetre.html
title: "Lancer une commande dans une nouvelle fenêtre avec Powershell"
date: 2019-09-26T00:00+01:00
layout: post
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
---

<acronym title="En résumé... (Too long; Didn't Read)">TL;DR</acronym> `Start-Process "cmd.exe" "/C ..."`
permet d'ouvrir une nouvelle console
dans une fenêtre à part et d'y lancer automatiquement une commande depuis Powershell.

<!--more-->

Certains exécutables ou programmes, lorsqu'ils sont lancés depuis
la ligne de commande Powershell, ne rendent pas immédiatement la main. Le
seul moyen de revenir à l'invite est donc de terminer le programme,
ou bien d'ouvrir manuellement une nouvelle console via le menu démarrer.

Par exemple si vous lancez le serveur de développement Webpack avec
`npm run start`, vous devez l'éteindre avec <kbd>Ctrl</kbd>+<kbd>C</kbd> avant de pouvoir
saisir une nouvelle instruction.

Il existe plusieurs solutions pour contourner ce problème. L'une d'entre
elles consiste à lancer le programme, non pas directement dans la console
en cours, mais dans une nouvelle fenêtre qu'on va démarrer automatiquement
pour héberger le programme.

Ceci peut être effectué à l'aide de `Start-Process`:

```powershell
Start-Process "cmd.exe" "/C npm run start"
```

Powershell rend alors directement la main et le programme est lancé dans
une fenêtre indépendante de la première.

Notez que cette nouvelle fenêtre est démarrée via `cmd.exe` mais
on peut tout à fait la lancer via une autre instance de
Powershell lui-même.

```powershell
Start-Process "pwsh.exe" "-c npm run start"
```

Autre avantage, si vous souhaitez fermer votre serveur Webpack, vous
n'avez qu'à cliquer sur la croix en haut à droite de la nouvelle console,
(au lieu de remettre le focus dans l'invite et taper `Ctrl+C`).
