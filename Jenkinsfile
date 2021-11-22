pipeline {
  agent any
  stages {
    stage('Build desarrollo') {
      when {
        branch 'develop'
      }
      steps {
        echo 'preparando construcción en el entorno desarollo'
        sh 'ssh devops@192.168.12.7 sudo chown -R devops:devops  /u02/lamb-patmos-build-dev/patmos-upeu-base-front-dist'
        sh ' rsync -avz * .[^.]* devops@192.168.12.7:/u02/lamb-patmos-build-dev/patmos-upeu-base-front-dist'
        sh 'ssh devops@192.168.12.7 "cd /u02/lamb-patmos-build-dev/patmos-upeu-base-front-dist && nvm use 12.16.1 && npm i -g @angular/cli && npm install"'
        sh 'ssh devops@192.168.12.7 "cd /u02/lamb-patmos-build-dev/patmos-upeu-base-front-dist && ng build --patmos dev --base-href /lamb-patmos/fronts/patmos-upeu-base-front/ --outputPath /u02/lamb-patmos-build-dev/patmos-upeu-base-front-dist"'
      }
    }
    stage('Despliegue Entorno de Desarrollo') {
      when {
        branch 'develop'
      }
      steps {
        echo 'preparando despliegue en el entorno desarollo'
        sh 'ssh devops@192.168.15.49 sudo chown -R devops:apache /u01/vhosts/lamb-patmos-dev.upeu.edu.pe/httpdocs/lamb-patmos/fronts/patmos-upeu-base-front'
        sh 'ssh devops@192.168.12.7 "rsync -avz /u02/lamb-patmos-build-dev/patmos-upeu-base-front-dist/dist devops@192.168.15.49:/u01/vhosts/lamb-patmos-dev.upeu.edu.pe/httpdocs/lamb-patmos/fronts/patmos-upeu-base-front"'
        sh 'ssh devops@192.168.15.49 sudo chown -R apache:apache /u01/vhosts/lamb-patmos-dev.upeu.edu.pe/httpdocs/lamb-patmos/fronts/patmos-upeu-base-front'
      }
    }
    
  }
}
