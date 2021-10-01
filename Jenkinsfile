pipeline {
  agent any
  stages {
    stage('Build desarrollo') {
      when {
        branch 'develop'
      }
      steps {
        echo 'preparando construcción en el entorno desarollo'
        sh 'ssh devops@192.168.12.7 sudo chown -R devops:devops  /u02/patmos-base-build-dev/patmos-dist'
        sh ' rsync -avz * .[^.]* devops@192.168.12.7:/u02/patmos-base-build-dev/patmos-dist'
        sh 'ssh devops@192.168.12.7 "cd /u02/patmos-base-build-dev/patmos-dist && nvm use 12.16.1 && npm i -g @angular/cli && npm install"'
        sh 'ssh devops@192.168.12.7 "cd /u02/patmos-base-build-dev/patmos-dist && ng build --patmos dev --base-href /patmos-base/fronts/patmos/ --outputPath /u02/patmos-base-build-dev/patmos-dist/dist"'
      }
    }
    stage('Despliegue desarrollo') {
      when {
        branch 'develop'
      }
      steps {
        echo 'preparando despliegue en el entorno desarollo'
        sh 'ssh devops@192.168.15.52 sudo chown -R devops:apache /u01/vhosts/www.upeu.dev/httpdocs/patmos-base/fronts/patmos'
        sh 'ssh devops@192.168.12.7 "rsync -avz /u02/patmos-base-build-dev/patmos-dist/dist devops@192.168.15.52:/u01/vhosts/www.upeu.dev/httpdocs/patmos-base/fronts/patmos"'
        sh 'ssh devops@192.168.15.52 sudo chown -R apache:apache /u01/vhosts/www.upeu.dev/httpdocs/patmos-base/fronts/patmos'
      }
    }
    
  }
}
