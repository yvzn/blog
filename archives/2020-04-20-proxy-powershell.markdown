---
permalink: /2020/04/19/proxy-powershell.html
title: "Configurer un proxy pour Powershell"
date: 2020-04-20T00:00+01:00
layout: post
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
series: authenticated-proxy
tags: code
---

<acronym title="En résumé... (Too long; Didn't Read)">TL;DR</acronym>
La plupart des commandes Powershell comme <a href="https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest">`Invoke-WebRequest`</a> ou <a href="https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod">`Invoke-RestMethod`</a> acceptent les paramètres `-Proxy` et `-ProxyUseDefaultCredentials` pour configurer le proxy http à utiliser lors des appels réseau.

<!--more-->

# Le paramètre -Proxy

Dans ce second article sur la fastidieuse configuration des proxy http  pour la ligne de commande sous Windows, j'aborde quelques solutions pour les _commandlets_ Powershell.

Il n'est, là encore, pas possible de passer de manière transparente par le proxy défini au niveau du système d'exploitation. Mais on peut néanmoins récupérer son paramétrage en faisant un appel à&nbsp;:

```powershell
([System.Net.WebRequest]::GetSystemWebproxy())
```

Dans les faits le proxy à utiliser peut varier, en fonction du service distant qu'on souhaite appeler&nbsp;: par exemple, une entreprise peut avoir défini un proxy spécifique pour les services dans son LAN et un autre proxy pour sortir vers internet.

Pour récupérer la bonne instance de proxy, on peut appeler la méthode `GetProxy` et lui passer par exemple une des futures adresses à interroger&nbsp;:

```powershell
$example_address_to_query = 'https://swapi.dev/'
$proxy = ([System.Net.WebRequest]::GetSystemWebproxy()).GetProxy($example_address_to_query)
```

On peut se servir de cet objet `$proxy` grâce aux paramètres `-Proxy` et `-ProxyUseDefaultCredentials`, qui sont acceptés par la plupart des commandes pouvant faire des appels vers le réseau&nbsp;:
- `-Proxy` avec l'objet `$proxy` préalablement récupéré
- et `-ProxyUseDefaultCredentials` pour utiliser les identifiants par défaut définis dans le proxy système

Ce qui donne par exemple:

```powershell
Invoke-WebRequest "https://swapi.dev/api/people/1/" -Proxy $proxy -ProxyUseDefaultCredentials
```

Si on ne peut pas utiliser `-ProxyUseDefaultCredentials`, on peut passer le paramètre `-ProxyCredential` auquel on fournit les informations récupérés, par exemple, par `Get-Credential`&nbsp;:

```powershell
$my_credentials = Get-Credential
Invoke-WebRequest "https://swapi.dev/api/starships/9/" -Proxy $proxy -ProxyCredential $my_credentials
```

# Conclusion

Le script peut être ajouté à `$PROFILE` (`notepad $PROFILE`) et/ou défini dans
une fonction Powershell personnalisée&nbsp;:

```powershell
function Get-DefaultSystemProxy
{
  param($example_address_to_query = 'https://www.google.fr')
  $proxy = ([System.Net.WebRequest]::GetSystemWebproxy()).GetProxy($example_address_to_query)
}

$default_proxy = Get-DefaultSystemProxy
```

{% include "partials/series.njk" %}
