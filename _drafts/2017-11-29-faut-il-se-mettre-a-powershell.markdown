---
title: "Se mettre à PowerShell ?"
date: 2017-11-22 09:08:19 +001
layout: post
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
---

 Oui, si vous voulez travailler plus rapidement et n'avez pas la possibilité (ou l'envie) d'installer Windows 10 ou un émulateur bash, ou bien si vous administrez des machines Windows plus "anciennes". Ou bien si vous aimez pouvoir vous en sortir un minimum dans n'importe quelle situation. Non si vous connaissez déjà bash et avez déjà un bash disponible.

<!--more-->

Au début, j'ai commencé par administrer des serveurs d'application sous Linux. Entre autres choses, cela m'a permis d'apprendre à utiliser bash et les outils de la ligne de commande, pour faire tout et n'importe quoi dans la console&nbsp;: édition de fichiers de configuration, déploiement de binaires, manipulation de données...

Lorsque j'ai installé Docker sous Windows, j'ai été intrigué qu'on me suggère d'utiliser PowerShell pour gérer mes conteneurs. Je connaissais l'existence de l'environnement de shell intégré dans les versions récentes de l'OS, mais je n'y avais jamais prêté attention. Après tout la bonne vieille console cmd héritée de MS-DOS faisait <del>bien</del> son boulot. Non je rigole, cmd fait le juste minimum (et le fait mal).

Donc j'ai regardé PowerShell de plus près. J'ai essayé de comprendre comment réaliser des tâches simples, parcourir des répertoires, filtrer des fichiers...

L'inconvénient c'est qu'il faut apprendre toute une syntaxe, dont la philosophie est certes cohérente, mais totalement à l'opposé de bash. En effet, au lieu de commandes qui sont quasiment des outils à tout faire, comme <code>awk</code> ou <code>find</code>, il faut décomposer la tâche en plusieurs petites instructions (des Cmdlet) qu'on chaîne les unes aux autres&nbsp;: <code>Get-Childitem</code> puis <code>Where-Object</code> puis <code>Select-String</code>...

Je ne dis pas qu'une méthode est meilleure que l'autre, mais il faut un peu changer sa logique et apprendre à faire différemment.

La question que je me suis alors posée est&nbsp;: est-ce que ça vaut le coup/coût&nbsp;? Est-ce que le bénéfice apporté par l'outil mérite le temps à apprendre son fonctionnement&nbsp;?

Surtout, si on est déjà suffisamment productif avec bash pour ne plus avoir à chercher systématiquement comment faire sur Stackoverflow, au quotidien il y a de grandes chances qu'un bash soit déjà installé dans son environnement. Y compris sous Windows. Par exemple si on utilise Git, il est installé par défaut avec Git bash. Dans le cas contraire, on peut toujours installer un émulateur comme MiniGW ou Cygwin.

Par ailleurs, Microsoft met progressivement à disposition le nouveau sous-système Linux sous Windows 10, qui permet d'installer une ligne de commande bash, voire un ubuntu "complet".

Sauf que dans les faits on n'a pas toujours les droits nécessaires pour installer des logiciels. Ou Windows 10. L'avantage de Powershell c'est qu'il est fourni par défaut. Il peut alors être intéressant de savoir au moins se débrouiller pour quelques tâches simples.

Aujourd'hui je déploie des applications, indifféremment sous Linux ou Windows. Dans un contexte où Microsoft arrête petit à petit les interfaces graphiques serveur, trop complexes à maintenir, et migre ses outils d'administration en ligne de commande; où ne déploie plus des exécutables en clic-bouton mais on gère des conteneurs Docker construits par des scripts automatisés, quelques notions de Powershell peuvent permettre de gagner du temps.
