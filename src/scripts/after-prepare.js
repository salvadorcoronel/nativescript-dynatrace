const fs = require('fs');
const path = require('path');

module.exports = function (hookArgs, projectData) {
    const platform = hookArgs.platform.toLowerCase();
    const { projectName, projectDir, appResourcesDirectoryPath } = projectData;

    // Check if dynatrace-service.json or dynatrace-service.js is there and load it:

    const configPathRootJSON = path.join(projectDir, 'dynatrace-service.json');
    const configPathRootJS = path.join(projectDir, 'dynatrace-service.js');
    const configPathJSON = path.join(appResourcesDirectoryPath, 'dynatrace-service.json');
    const configPathJS = path.join(appResourcesDirectoryPath, 'dynatrace-service.js');

    let config = null;

    if (fs.existsSync(configPathRootJSON)) {
        config = require(configPathRootJSON);;
    } else if (fs.existsSync(configPathRootJS)) {
        config = require(configPathRootJS);;
    } if (fs.existsSync(configPathJSON)) {
        config = require(configPathJSON);;
    } else if (fs.existsSync(configPathJS)) {
        config = require(configPathJS);
    }

    if (!config) {
        console.error(`You need create dynatrace-service.json or dynatrace-service.js config file in ${ projectDir } or ${ appResourcesDirectoryPath }!`);

        return;
    }

    // Validate that the basic properties are in the config:

    if (!config.DTXApplicationID || !config.DTXAgentEnvironment || !config.DTXClusterURL) {
        console.error('The dynatrace-service config file must include at least the properties DTXApplicationID, DTXAgentEnvironment and DTXClusterURL');

        return;
    }

    // Generate the actual config files for Android (build.gradle) or iOS

    if (platform === 'android') {
        const buildGradlePath = path.join(projectData.platformsDir, 'android', 'app', 'build.gradle');

        if (fs.existsSync(buildGradlePath)) {
            const buildGradleContent = fs.readFileSync(buildGradlePath).toString();

            if (buildGradleContent.indexOf('dynatrace') === -1) {
                fs.writeFileSync(buildGradlePath, buildGradleContent + getAndroidConfig(config));

                console.log('Dynatrace added to the Project NS Android!');
            } else {
                console.error('Dynatrace config already present in build.gradle.');
            }
        } else {
            console.error(`${ buildGradlePath } not found.`);
        }
    } else if (platform === 'ios') {
        const infoPlistPath = path.join(projectData.platformsDir, 'ios', projectName, projectName+'-Info.plist');

        if (fs.existsSync(infoPlistPath)) {
            const infoPlistContent = fs.readFileSync(infoPlistPath).toString();
            const beforeClosingDictIndex = infoPlistContent.lastIndexOf('</dict>');

            // TODO: Verify the keys do not exist already!

            fs.writeFileSync(infoPlistPath, infoPlistContent.slice(0, beforeClosingDictIndex) + getIOSConfig(config) + infoPlistContent.slice(beforeClosingDictIndex));

            console.error('Dynatrace added to the Project NS iOS!');
        } else {
            console.error(`${ infoPlistPath } not found.`);
        }
    }
};


function getAndroidConfig(config) {
    const DTXApplicationID = config.DTXApplicationID;
    const DTXAgentEnvironment = config.DTXAgentEnvironment;
    const DTXClusterURL = config.DTXClusterURL;

    delete config.DTXApplicationID;
    delete config.DTXAgentEnvironment;
    delete config.DTXClusterURL;

    const agentPropertiesString = Object.entries(config).map(([key, value]) => `'${ key }': '${ value }'`).join(', ');

    return `
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
                applicationId '${ DTXApplicationID }'
                environmentId '${ DTXAgentEnvironment }'
                cluster '${ DTXClusterURL }'
                agentProperties ${ agentPropertiesString }
            }
        }
    `;
}

function getIOSConfig(config) {
    const parsers = {
        string: (str) => `<string>${ str }</string>`,
        number: (int) => `<integer>${ parseInt(int) }</integer>`,
        boolean: (bool) => `<${ bool }/>`,
    };

    return Object.entries(config).map(([key, value]) => {
        const valueParser = parsers[typeof value];

        return `    <key>${ key }</key>${ valueParser ? `\n    ${ valueParser(value) }` : '' }`;
    }).join('\n');
}
