pipeline {
  agent any
  stages {
    stage('Build desarrollo') {
      when {
        branch 'develop'
      }
      steps {
        echo 'preparando construcción en el entorno desarollo'
        sh 'ssh devops@192.168.12.7 sudo chown -R devops:devops  /u02/lamb-admission-build-dev/reporting-dist'
        sh ' rsync -avz * .[^.]* devops@192.168.12.7:/u02/lamb-admission-build-dev/reporting-dist'
        sh 'ssh devops@192.168.12.7 "cd /u02/lamb-admission-build-dev/reporting-dist && nvm use 12.16.1 && npm i -g @angular/cli && npm install"'
        sh 'ssh devops@192.168.12.7 "cd /u02/lamb-admission-build-dev/reporting-dist && ng build --reporting dev --base-href /lamb-admission/fronts/reporting/ --outputPath /u02/lamb-admission-build-dev/reporting-dist/dist"'
      }
    }
    stage('Despliegue desarrollo') {
      when {
        branch 'develop'
      }
      steps {
        echo 'preparando despliegue en el entorno desarollo'
        sh 'ssh devops@192.168.15.52 sudo chown -R devops:apache /u01/vhosts/www.upeu.dev/httpdocs/lamb-admission/fronts/reporting'
        sh 'ssh devops@192.168.12.7 "rsync -avz /u02/lamb-admission-build-dev/reporting-dist/dist devops@192.168.15.52:/u01/vhosts/www.upeu.dev/httpdocs/lamb-admission/fronts/reporting"'
        sh 'ssh devops@192.168.15.52 sudo chown -R apache:apache /u01/vhosts/www.upeu.dev/httpdocs/lamb-admission/fronts/reporting'
      }
    }

    stage('Build produccion') {
      when {
        branch 'master'
      }
      steps {
        echo 'preparando construcción en el entorno producción'
        sh 'ssh devops@192.168.12.7 sudo chown -R devops:devops  /u02/lamb-admission-build-prod/reporting-dist'
        sh ' rsync -avz * .[^.]* devops@192.168.12.7:/u02/lamb-admission-build-prod/reporting-dist'
        sh 'ssh devops@192.168.12.7 "cd /u02/lamb-admission-build-prod/reporting-dist && nvm use 12.16.1 && npm i -g @angular/cli && npm install"'
        sh 'ssh devops@192.168.12.7 "cd /u02/lamb-admission-build-prod/reporting-dist && ng build --prod --base-href /reporting/ --outputPath /u02/lamb-admission-build-prod/reporting-dist/dist"'
      }
    }
    stage('Despliegue produccion') {
      parallel {
        stage('Nodo 1') {
          when {
            branch 'master'
          }
          steps {
            echo 'preparando despliegue en el entorno producción'
            sh 'ssh devops@192.168.12.46 sudo chown -R devops:apache /u01/vhosts/lamb-admission.upeu.edu.pe/httpdocs/lamb-admission/fronts/reporting-dist'
            sh 'ssh devops@192.168.12.7 "rsync -avz /u02/lamb-admission-build-prod/reporting-dist/dist devops@192.168.12.46:/u01/vhosts/lamb-admission.upeu.edu.pe/httpdocs/lamb-admission/fronts/reporting-dist"'
            sh 'ssh devops@192.168.12.46 sudo chown -R apache:apache /u01/vhosts/lamb-admission.upeu.edu.pe/httpdocs/lamb-admission/fronts/reporting-dist'
          }
        }
        stage('Nodo 2') {
          when {
            branch 'master'
          }
          steps {
            echo 'preparando despliegue en el entorno producción'
            sh 'ssh devops@192.168.12.55 sudo chown -R devops:apache /u01/vhosts/lamb-admission.upeu.edu.pe/httpdocs/lamb-admission/fronts/reporting-dist'
            sh 'ssh devops@192.168.12.7 "rsync -avz /u02/lamb-admission-build-prod/reporting-dist/dist devops@192.168.12.55:/u01/vhosts/lamb-admission.upeu.edu.pe/httpdocs/lamb-admission/fronts/reporting-dist"'
            sh 'ssh devops@192.168.12.55 sudo chown -R apache:apache /u01/vhosts/lamb-admission.upeu.edu.pe/httpdocs/lamb-admission/fronts/reporting-dist'
          }
        }
      }
    }
  }
}
