---
permalink: /2017/11/01/creer-un-fichier-sans-editeur.html
title: "Créer un fichier sans éditeur"
date: 2017-11-02T00:00+01:00
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
tags: code
---

 Pour créer un nouveau fichier <em>exemple.txt</em> sous bash&nbsp;:

```bash
cat <<EOF >exemple.txt
Remplacer
ce texte
par le contenu du fichier
EOF
```

<!--more-->

Sous certains Unix ou Linux minimalistes, il n'y a parfois pas d'éditeur de texte disponible (même vim ou nano). Par exemple dans des distributions orientées IoT ou dans des images Docker optimisées.

Pour initialiser <em>un nouveau fichier vide</em>, vous pouvez (entre autres) utiliser la commande ```cat```, qui permet par ailleurs de faire bien d'autres choses.

```bash
cat /dev/null >exemple.txt
```

Si vous enlevez le premier argument, ```cat``` passe en mode interactif. Vous pouvez saisir votre texte directement et terminer par <kbd>Control + D</kbd>

```bash
cat >exemple.txt
...
...
```
<kbd>Control + D</kbd>

Cela fonctionne même si le contenu s'étend sur plusieurs lignes.

Vous pouvez également utiliser la syntaxe <em>heredoc</em> de bash, notamment si le <kbd>Control + D</kbd> ne fonctionne pas dans votre terminal.

Cette syntaxe utilise un délimiteur arbitraire défini lors de l'appel à ```cat```. J'ai choisi EOF mais XXX conviendra également.

```bash
cat <<EOF >exemple.txt
...
...
EOF
```

Tout le contenu jusqu'au délimiteur est alors ajouté au fichier <em>exemple.txt</em>, y compris les sauts de lignes.

Note: le délimiteur <em>n'est pas écrit</em> dans le fichier.

Note 2: ```cat >exemple.txt``` écrase le fichier s'il existe déjà. Pour concaténer en fin de fichier, vous pouvez écrire ```cat >>exemple.txt```

Plus d'infos sur la commande ```cat```... sur Google 👨🏽‍💻
