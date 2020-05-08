// Declarative pipelines must be enclosed with a "pipeline" directive.
pipeline {
    // This line is required for declarative pipelines. Just keep it here.
    agent any

    // This section contains environment variables which are available for use in the
    // pipeline's stages.
    environment {
	    region = "ca-central-1"
        docker_repo_uri = "221020305703.dkr.ecr.ca-central-1.amazonaws.com/node_apps"
		task_def_arn = ""
        cluster = ""
        exec_role_arn = ""
    }
    
    // Here you can define one or more stages for your pipeline.
    // Each stage can execute one or more steps.
    stages {
        // This is a stage.
        stage(' Clone Repository ') {

            git branch: "master",
            url: "git@github.com:abhishek-raut1707/Node_API_with_passport.js.git",
            credentialsId: "github-NodeBank"
        }

        stage(' Build Image ') {

            sh "docker build --build-args APP_NAME=NodeBank -t 221020305703.dkr.ecr.ca-central-1.amazonaws.com/node_apps:latest ."
        }

        stage(' Push Image ') {

            docker.withRegistry('https://221020305703.dkr.ecr.ca-central-1.amazonaws.com', 'ecr:ca-central-1:docker-ecr-node-app') {

                sh "docker push 221020305703.dkr.ecr.ca-central-1.amazonaws.com/node_apps"
            }
        }
    }
}

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