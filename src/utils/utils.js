/**
 * Created by eugene.levenetc on 02/09/16.
 */
module.exports = {
    checkEnvVar: function (envName, crash) {
        if (!process.env[envName]) {
            const message = 'Error. No defined env var: ' + envName;
            if (crash) throw new Error(message);
            else console.log(message);
        } else {
            return process.env[envName];
        }
    },

    checkNull: function (value) {
        if (value == null || value == undefined) throw new Error('no value');
    }
};