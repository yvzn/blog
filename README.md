---
layout: page
title: A propos de...
permalink: /about/
---

# Human Learning(s)

Ce blog utilise le logiciel open source [Jekyll](https://jekyllrb.com/) 
avec le thème [minima](https://github.com/jekyll/minima)
et est hébergé sur Github Pages.

Pour lancer le site en local après avoir cloné le dépôt git, vous aurez besoin de Ruby et de [Jekyll](https://jekyllrb.com/) (toutes les instructions d'installation sont dans ce lien)

```powershell
git clone https://github.com/yvzn/blog.git
bundle exec jekyll serve
```

Puis ouvrir http://localhost:4000/ dans un navigateur.

## Licence

Les textes et articles sont distribués sous licence 
[Creative Commons Attribution Share Alike 4.0](https://choosealicense.com/licenses/cc-by-sa-4.0/)
(voir le fichier CONTENT-LICENSE)

Les composants logiciels sont distribués sous licence Apache (voir le fichier LICENSE)

L'ensemble du code source est disponible sur [Github](https://github.com/yvzn/blog).

## Avec Docker

Pour lancer le site en local sans installer Ruby, vous pouvez utiliser Docker:

```powershell
docker run --rm `
  -v ${PWD}:/srv/jekyll `
  -p 4000:4000 `
  -it jekyll/jekyll `
  bundle exec jekyll serve --watch --drafts --host 0.0.0.0
```

Puis ouvrir http://localhost:4000/ dans un navigateur.

Pour mettre à jour les dépendances :

```powershell
docker run --rm `
  -v ${PWD}:/srv/jekyll `
  -it jekyll/jekyll `
  bundle update
```

