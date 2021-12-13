@Library('ceiba-jenkins-library') _

pipeline{
	
		agent {
		label 'Slave_Induccion'
		}
	
        
		triggers {
        pollSCM('@hourly')
		}
	
		options {
			buildDiscarder(logRotator(numToKeepStr: '3'))
			disableConcurrentBuilds()
		}
		
		stages{
		
			stage('Checkout') {
				steps {
					echo '------------>Checkout desde Git Microservicio<------------'
					checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default' , submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'GitHub_boterojuanpa', url: 'https://github.com/boterojuanpa/node-jest-arquitectura-hexagonal']]])
				}
			}		
		
			stage('compilar '){
        steps {
					sh 'npm i'
					sh 'npm run build'					
				}
			}

			stage('test coverage'){
				steps {
					sh 'npm run test:cov'					
				}
			}

			stage('Unit Test') {
				steps {
					echo "------------>Testing<------------"
					sh 'npm run test:unit'
				}
			}

			stage('Test end-to-end') {
				steps{
					echo "------------>Testing Protractor<------------"
					sh 'npm run test:e2e'
				}
			}

			
			stage('Sonar Analysis'){
				steps{
					echo '------------>Analisis de código estático<------------'
					withSonarQubeEnv('Sonar') {
						sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dsonar.projectKey=co.com.ceiba.adn:ADN-productos3D.david.cortes -Dsonar.projectName=co.com.ceiba.adn:ADN-productos3D.david.cortes -Dproject.settings=./sonar-project.properties"
					}
				}
			}
		
		

		}
		post {
			failure {
				mail(to: 'david.cortes@ceiba.com.co',
				body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
				subject: "ERROR CI: ${env.JOB_NAME}")
			}

			success {
				junit 'build/test-results/test/*.xml'
			}
		}	
			
}