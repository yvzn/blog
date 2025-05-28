---
permalink: /2020/01/05/azure-cli-proxy.html
title: "Configurer un proxy pour Azure CLI "
date: 2020-01-06T00:00+01:00
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
tags:
  - authenticated-proxy
  - code
---


Pour se connecter à Azure via la ligne de commande Windows,
nous pouvons si nécessaire définir le proxy http à utiliser via les variables
d'environnement `HTTP_PROXY` et `HTTPS_PROXY`.

<!--more-->

# Deux variables d'environnement

Que ce soit avec CMD ou avec Powershell, configurer un proxy http pour la ligne de
commande sous Windows n'est pas aussi simple que cela devrait. En effet,
le proxy défini au niveau du système d'exploitation n'est pas récupéré automatiquement,
comme c'est le cas pour d'autres programmes. De plus, une fois dans la console,
il n'y a pas de méthode uniformisée, chaque outil utilise son propre paramétrage.

En l'occurence, la CLI Azure se base sur les variables d'environnement `HTTP_PROXY`
et `HTTPS_PROXY`. Pour utiliser un proxy http sous Windows vous devrez donc
alimenter ces deux valeurs avec l'URI du proxy à utiliser.

```
HTTP_PROXY = "http:// ...user...&nbsp;: ... mot de passe ... @ ... nom du proxy&nbsp;: port"
```

Et oui, il faut mettre ses identifiants en clair dans la variable. Par exemple:

```
HTTP_PROXY = "http://user:password@proxy.acme.local:8080"
```

## Avec CMD

Nous pouvons utiliser la commande `SET` pour définir les variables d'environnement&nbsp;:

```batch
set HTTP_PROXY=http://user:password@proxy.acme.local:8080
set HTTPS_PROXY=http://user:password@proxy.acme.local:8080

az login
...
```

## Avec Powershell

Nous pourrions utiliser l'équivalent de `SET`, mais nous pouvons également
essayer d'être plus malins.

En effet, l'instruction `SET` avec son mot de passe en clair, va rester
dans l'historique Powershell, ce qui n'est pas idéal. Nous pouvons à la place
appeler la Cmdlet `Get-Credential`, qui va afficher une invite permettant
de saisir ses identifiants et de les stocker dans une variable temporaire
à la session.

```powershell
$my_credentials = Get-Credential
```

Le contenu de la variable pourra être utilisé pour construire les variables
d'environnement et les identifiants ne seront pas conservés dans l'historique.

Deuxième protection, certes toute relative, la portée de la variable
d'environnement peut être limitée au process Powershell
en cours (c'est à dire à la console ouverte) ce qui évitera de conserver
indéfiniment l'information ou de la partager avec d'autres consoles.

```powershell
[Environment] ::SetEnvironmentVariable("HTTP_PROXY", "http://user:password@proxy.acme.local:8080", [EnvironmentVariableTarget]::Process)
```

Enfin, une fois la configuration effectuée, avec `Remove-Variable`
nous pouvons nettoyer toutes les variables temporaires générées par `Get-Credential`.

Ce qui donne le script suivant:

```powershell
$my_proxy_host = "some-host-name-or-ip"
$my_proxy_port = "8080"
$my_credentials = Get-Credential
$my_proxy_string = "http://$($my_credentials.UserName):$($my_credentials.GetNetworkCredential().password)@${my_proxy_host}:${my_proxy_port}"

[Environment] ::SetEnvironmentVariable("HTTP_PROXY", $my_proxy_string, [EnvironmentVariableTarget]::Process)
[Environment] ::SetEnvironmentVariable("HTTPS_PROXY", $my_proxy_string, [EnvironmentVariableTarget]::Process)

Remove-Variable my_proxy_host
Remove-Variable my_proxy_port
Remove-Variable my_credentials
Remove-Variable my_proxy_string
```

Attention cependant&nbsp;: malgré les précautions prises, le mot de passe reste défini
en clair dans les variables d'environnement de la console en cours.

# Conclusion

Le script peut être ajouté à `$PROFILE` (`notepad $PROFILE`) et/ou défini dans
une fonction Powershell personnalisée:

```powershell
function Configure-Proxy
{
  param($my_proxy_host = "some-host-name-or-ip", $my_proxy_port = "8080")

  $my_credentials = Get-Credential
  $my_proxy_string = "http://$($my_credentials.UserName):$($my_credentials.GetNetworkCredential().password)@${my_proxy_host}:${my_proxy_port}"

  [Environment] ::SetEnvironmentVariable("HTTP_PROXY", $my_proxy_string, [EnvironmentVariableTarget]::Process)
  [Environment] ::SetEnvironmentVariable("HTTPS_PROXY", $my_proxy_string, [EnvironmentVariableTarget]::Process)

  Remove-Variable my_credentials
  Remove-Variable my_proxy_string
}
```

Nous pouvons désormais nous connecter à Azure via la CLI en passant par
un proxy http et en renseignant le mot de passe.

```powershell
Configure-Proxy

az login
az account list -o table
...
```

{% include "partials/series.njk" %}
