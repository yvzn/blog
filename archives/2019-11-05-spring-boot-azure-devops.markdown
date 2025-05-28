---
permalink: /2020/01/01/spring-boot-azure-devops.html
title: "Déployer une application Spring Boot avec Azure Devops"
date: 2020-01-02T00:00+01:00
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
tags: spring-boot-azure
---

 La plateforme
Azure Devops permet de constuire et déployer automatiquement, en continu, une application Java
Spring Boot dans le cloud Microsoft. Un fichier `yaml` versionné avec le code source
permet de configurer comment un tel déploiement peut être réalisé. Dans ce second article,
je décris créér et paramétrer Azure Devops par le code.

<!--more-->

# Déployer avec Azure Devops

A titre d'exemple, j'ai choisi de déployer [La Recyclette](https://recyclette.azurewebsites.net/),
mon application Spring Boot utilisant la webcam du navigateur pour déterminer
si un déchet peut être recyclé.

Dans un premier article, je décris comment [créer et
configurer l'infrastructure Azure](/2019/10/27/spring-boot-azure) nécessaire au
déploiement de cette application (ressource de type _Application Web_).
Il s'agit maintenant  de compiler et de packager cette application puis de la
déployer dans la resource Azure préalablement configurée.

Pour le reste de l'article, je suppose que vous êtes connectés a
[Azure Devops](https://dev.azure.com) et que vous avez un abonnement valide.
L'abonnement gratuit (limité à 5 utilisateurs) suffit.

# Créer un pipeline Azure Devops

Il faut commencer par un nouveau _projet_ dans Azure Devops. Un _projet_
regroupe l'ensemble des services permettant la réalisation et le déploiement
d'une application web. Nous allons uniquement utiliser le service _pipelines_, mais
les autres ont également leurs qualités et mériteraient une présentation
à part entière (repos, boards agiles, etc.)

Une fois le projet en place, on peut se rendre dans l'onglet _Pipelines_ > _Pipelines_
pour commencer l'automatisation de notre déploiement.

Azure Devops va demander où récupérer le code source de l'application. Puisque dans notre
cas le code source est disponible sur [github.com](https://github.com/yvzn/recikligi/),
il faut associer son compte Github à Azure Devops. Cette opération nécessite de se
connecter à Github et de fournir les autorisations nécessaires.

# Configuration par fichier

Azure Devops demande un droit d'écriture dans le repository. Cela peut sembler
intrusif, mais donne en réalité l'opportunité de sauvegarder la configuration
de déploiement dans un fichier `yaml`, directement versionné au même endroit que votre code.
Les intérêts sont multiples&nbsp;: répéter le déploiement, le faire évoluer en même temps
que votre architecture, etc.

L'écriture de ce fichier `yaml` est largement assistée dans Azure Devops, via des templates
et des assistants, l'expérience est vraiment moderne. Vous pouvez également prendre
l'option d'une configuration plus classique, via des écrans et des formulaires,
en cliquant sur le lien _Classic editor_ en bas de page.

Nous pouvons commencer avec le _Starter pipeline_, qui va initialiser un fichier `yaml`
et afficher un éditeur de texte permettant de le compléter.

Il contient trois sections `trigger` et `pool` et `steps`. `trigger` définit la branche
à observer pour déclencher le build en continu, `pool` paramètre l'ensemble d'ordinateurs
(agents) utilisés pour le build et enfin `steps` définit les tâches du build en lui même.

Le contenu par défaut du fichier est l'équivalent d'un _hello world_. On peut
commencer par vider les tâches d'exemples insérées par défaut sous `steps:`.

# Build

L'étape suivante est de packager notre application. Il faut indiquer à Azure Devops
l'ensemble des actions nécessaires pour créer ce package. Ces actions vont prendre la
forme de tâches, décrites dans le fichier `yaml`  par un type, une description et des paramètres.

Un assistant de conception `yaml`, permettant de faciliter le renseignement de ces
informations, est disponible à l'aide du bouton _Show assistant_ sur la droite de l'éditeur.

Puisqu'il s'agit d'une application Spring Boot construite avec Maven, rechercher
et sélectionner la tâche de type _maven_ dans l'assistant,
paramétrer les différentes options (chemin vers le `pom.xml`, etc.)
et cliquer sur Add.

Attention, le contenu `yaml` va être inséré à l'endroit où le curseur est positionné dans
l'éditeur, il faut donc bien s'assurer que ce dernier à l'endroit souhaité
(la fin du fichier, après `steps:`)
avant de cliquer sur Add, sinon le code ne sera plus valide.

```yaml
- task: Maven@3
    displayName: 'Maven Package'
    inputs:
    mavenPomFile: 'pom.xml'
```

# Copier les fichiers

Après cette étape Maven a en théorie généré une archive `jar` dans le
dossier `target` de l'environnement de travail.

La seconde étape consiste à copier cette archive dans un second répertoire, le répertoire
de staging. En effet, l'environnement de travail contient de nombreux fichiers intermédiaires
(`.class`, `.obj`, etc.) qui n'ont pas d'intérêt à être déployés. Il faut donc récupérer
uniquement l'archive qui nous intéresse. Ceci peut être fait avec la tache `CopyFiles`
(à rechercher dans l'assistant)

```yaml
- task: CopyFiles@2
    displayName: 'Copy Files to artifact staging directory'
    inputs:
    SourceFolder: '$(System.DefaultWorkingDirectory)'
    Contents: '**/target/*.?(war|jar)'
    TargetFolder: $(Build.ArtifactStagingDirectory)
```

# Déployer

La dernière étape consiste à déployer l'archive dans la resource Azure de type _Application Web_.

Ceci peut être fait avec la tache `AzureWebApp`. Il faut spécifier l'identifiant de
la souscription (l'abonnement) Azure dans laquelle déployer, ainsi que le nom de
l'application, qui correspond au nom de l'instance applicative crée précédemment.

```yaml
- task: AzureWebApp@1
displayName: 'Azure Web App Deploy'
inputs:
    azureSubscription: ...
    appType: webAppLinux
    appName: ...
    package: '$(Build.ArtifactStagingDirectory)/**/target/*.?(war|jar)'
```

# Organisation

Pour mieux identifier les différentes tâches, elles peuvent être regroupées en
sous parties&nbsp;: des `stages`. Par exemple j'ai choisi d'en créer deux&nbsp;: une pour le build
et une pour le déploiement. Dans ce cas particulier, j'ai dû ajouter une tâche pour
uploader les fichiers dans un répertoire `drop` partagé entre les différents `stages`.

Des variables de build (pour l'environnement et la souscription)
ont également été ajoutées pour simplifier la maintenance.
L'avantage est que ces variables peuvent être modifiées / surchargées
lors du lancement de la _pipeline_.

# Conclusion

Ces quelques étapes permettent de construire et de déployer une application
Spring Boot dans Azure, à l'aide d'un fichier versionné avec le code source.
La configuration choisie permet de déclencher ce déploiement automatiquement
à chaque commit sur master.

Un exemple de [fichier de configuration complet](https://github.com/yvzn/recikligi/blob/master/azure-pipelines.yml)
est disponible sur Github.

{% include "partials/series.njk" %}
