pipeline {

    agent {

        docker { image 'node:10' }
    }
    stages {

        stage(' Build Info ') {
            steps {
                sh "echo '${username} started build with ${BUILD_NUMBER}'"
            }
        }
        stage(' Clone Repository ') {
            steps {
                checkout scm
            }
        }
    }
}