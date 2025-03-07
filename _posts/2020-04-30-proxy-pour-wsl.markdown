---
title: "Configurer un proxy pour WSL"
date: 2020-04-30 00:00:00 +001
layout: post
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
series: authenticated-proxy
---

<acronym title="En résumé... (Too long; Didn't Read)">TL;DR</acronym>
Pour se connecter à internet dans le sous-système Linux pour Windows, nous pouvons configurer le proxy http à utiliser à l'aide des variables d'environnement `http_proxy` et `https_proxy` et grâce à la directive `Acquire::http::Proxy` dans `apt.conf`.

<!--more-->

# Pour WSL

Dans ce troisième article sur la configuration des proxy http authentifiés sous Windows, voici une solution pour WSL. Là aussi, il va falloir configurer l'URI du proxy à utiliser, avec les identifiants et les mots de passe, à divers endroits du sous-système Linux.

Pour cet exemple, la distribution Debian est utilisée, mais la configuration est sensiblement identique pour les autres distributions.

La plupart des outils se basent sur les variables d'environnement `http_proxy` et `https_proxy`, le plus simple est donc de modifier le fichier `~/.bashrc` qui est exécuté à chaque démarrage de session.

Pour ouvrir le fichier avec `vi`&nbsp;:

```bash
vi ~/.bashrc
```

Puis ajouter les lignes suivantes (raccourci <kbd>i</kbd>)&nbsp;:

```bash
http_proxy=http:// ...user... : ...mot_de_passe... @proxy.acme.local:8080
https_proxy=$http_proxy
export http_proxy
export https_proxy
```

Sauvegarder et quitter `vi` (raccourci <kbd>Echap</kbd> + <kbd>:</kbd> + <kbd>w</kbd> + <kbd>q</kbd>), puis recharger la configuration&nbsp;:
- soit en redémarrant
- soit en tapant `source ~/.bashrc`

Petite subtilité, certains programmes utilisent les variables `HTTP_PROXY` et `HTTPS_PROXY` (en majuscule). Il faudra donc ajouter les lignes suivantes dans le fichier `~/.bashrc`&nbsp;:

```bash
HTTP_PROXY=$http_proxy
HTTPS_PROXY=$http_proxy
export HTTP_PROXY
export HTTPS_PROXY
```

Enfin il peut être intéressant de rajouter certaines exceptions afin qu'elles ne passent pas par le proxy. Par exemple, si on utilise WSL pour lancer un serveur web ou si on accéde depuis WSL à un serveur web lancé sur son hôte windows&nbsp;:

```bash
no_proxy=localhost,127.0.0.1
export no_proxy
```

Ce qui donne au final le fichier `~/.bashrc` suivant&nbsp;:

```bash
http_proxy=http:// ...user... : ...mot_de_passe... @proxy.acme.local:8080
https_proxy=$http_proxy
HTTP_PROXY=$http_proxy
HTTPS_PROXY=$http_proxy
export http_proxy
export https_proxy
export HTTP_PROXY
no_proxy=localhost,127.0.0.1
export no_proxy
```

## Pour apt-get

Le gestionnaire de paquets Apt a sa propre configuration de proxy stockée dans son fichier de paramétrage, qu'il faudra donc éditer, avec une élévation de privilèges.

```bash
sudo vi /etc/apt/apt.conf
```

Puis ajouter&nbsp;:

```
Acquire::http::Proxy "http:// ...user... : ...mot_de_passe... @proxy.acme.local:8080";
```

# Conclusion

Ces différents paramétrages permettent d'interagir avec le réseau internet depuis WSL, afin par exemple de mettre à jour ou d'installer de nouveaux paquets, ou d'utiliser des outils comme cURL. Les identifiants utilisateur doivent être stockés en dur dans des fichiers, il faudra donc veiller à sécuriser proprement l'accès au sous-système. Et bien sûr il faudra penser à mettre à jour ces variables lorsque le mot de passe sera changé.

{% include series.html  %}
