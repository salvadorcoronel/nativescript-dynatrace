var fs = require('fs');
var path = require('path');

module.exports = function (hookArgs, projectData) {
    var platform = hookArgs.platform.toLowerCase();
    var projectName = projectData.projectName;
    var dynatraceServiceInfoFilePath = path.join(projectData.appResourcesDirectoryPath, 'dynatrace-service.json');

    if (fs.existsSync(dynatraceServiceInfoFilePath)) {
        var dynatraceServiceInfoJson = require(dynatraceServiceInfoFilePath);

        if (dynatraceServiceInfoJson.project_info &&
            dynatraceServiceInfoJson.project_info.applicationId &&
            dynatraceServiceInfoJson.project_info.environmentId &&
            dynatraceServiceInfoJson.project_info.cluster) {

            if (platform === 'android') {

                const gradleDynatraceRuntime = `
buildscript {
    repositories {
        jcenter()
    }
    dependencies { 
        classpath 'com.dynatrace.tools:android:+'
    }
}

apply plugin: 'com.dynatrace.tools.android'
dynatrace {
    defaultConfig {
        applicationId '${dynatraceServiceInfoJson.project_info.applicationId}'
        environmentId '${dynatraceServiceInfoJson.project_info.environmentId}'
        cluster '${dynatraceServiceInfoJson.project_info.cluster}'
    }
}
`;

                var buildGradlePath = path.join(projectData.platformsDir, 'android', 'app', 'build.gradle');
                if (fs.existsSync(buildGradlePath)) {
                    var buildGradleContent = fs.readFileSync(buildGradlePath).toString();
                    if (buildGradleContent.indexOf('dynatrace') === -1) {
                        fs.writeFileSync(buildGradlePath, buildGradleContent + gradleDynatraceRuntime);
                        console.log('Dynatrace added to the Project NS Android!');
                    }
                }
            }

            if (platform === 'ios') {
                var infoPlistPath = path.join(projectData.platformsDir, 'ios', projectName, projectName+'-Info.plist');
                if (fs.existsSync(infoPlistPath)) {
                    var infoPlistContent = fs.readFileSync(infoPlistPath).toString();
                    infoPlistContent = infoPlistContent.replace('Dynatrace_DTXAgentEnvironment', dynatraceServiceInfoJson.project_info.environmentId);
                    infoPlistContent = infoPlistContent.replace('Dynatrace_DTXApplicationID', dynatraceServiceInfoJson.project_info.applicationId);
                    infoPlistContent = infoPlistContent.replace('Dynatrace_DTXClusterURL', dynatraceServiceInfoJson.project_info.cluster);
                    fs.writeFileSync(infoPlistPath, infoPlistContent);
                    console.log('Dynatrace added to the Project NS iOS!');
                }
            }
        } else {
            console.log('The dynatrace-service.json config file does not have the correct format!');
        }
    } else {
        console.log('You need create dynatrace-service.json config file!')
    }
};