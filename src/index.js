module.exports = function (source, arg2) {
    return {
        noColors:       true,
        currentFixture: null,

        report: {
            startTime:  null,
            endTime:    null,
            userAgents: null,
            passed:     0,
            total:      0,
            skipped:    0,
            fixtures:   [],
            warnings:   []
        },

        reportTaskStart (startTime, userAgents, testCount) {
            this.report.startTime  = startTime;
            this.report.userAgents = userAgents;
            this.report.total      = testCount;
        },

        reportFixtureStart (name, path, meta) {
            if(projectRoot) {
                path = path.replace(projectRoot, '');
            }

            this.currentFixture = { name, path, meta, tests: [] };
            this.report.fixtures.push(this.currentFixture);
        },

        reportTestDone (name, testRunInfo, meta) {
            var errs = testRunInfo.errs.map(err => this.formatError(err));
            
            if (testRunInfo.skipped)
                this.report.skipped++;

            let videos;
            if (testRunInfo.videos) {
                videos = testRunInfo.videos.map(v => {
                    if(projectRoot && v.videoPath) {
                        return v.videoPath.replace(projectRoot, '');
                    }
                    return v.videoPath;
                });
            }

            this.currentFixture.tests.push({
                name: name,
                meta: meta,
                errs: errs,

                durationMs:     testRunInfo.durationMs,
                unstable:       testRunInfo.unstable,
                screenshotPath: testRunInfo.screenshotPath,
                skipped:        testRunInfo.skipped,
                videos,
            });
        },

        reportTaskDone (endTime, passed, warnings) {
            this.report.passed   = passed;
            this.report.endTime  = endTime;
            this.report.warnings = warnings;
            if (gitInfo) {
                this.report.commit = gitInfo.commit.id;
                this.report.branch = gitInfo.branch;
            }
            this.write(JSON.stringify(this.report, null, 2));
        }
    };
}
