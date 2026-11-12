const StandalonePage = require('../pages/standalone.page');

describe('Audio injection', () => {
  const standalone = new StandalonePage();

  it('should inject audio_sample.mp3 into the microphone and record it', async () => {
    await standalone.openAudio();

    const play = await standalone.textView('Play recording');
    await expect(play).toBeDisplayed({
      message: 'The "Play recording" button should be visible on the Audio injection screen',
    });

    // Uploads web-tests/fixtures/audio_sample.mp3, injects it, then taps Record.
    await standalone.startAudioRecording();

    // Let the injected audio play into the recording for 10 seconds, then stop it.
    await standalone.stopAudioRecording(10000);

    const status = await standalone.audioStatus();
    await status.waitForDisplayed({
      timeout: 30000,
      timeoutMsg: 'Expected "Recorded. Injected audio should play back." after stopping the recording',
    });
    await expect(status).toHaveText('Recorded. Injected audio should play back.', {
      message: 'The status line should read "Recorded. Injected audio should play back." after the recording stops',
    });
  });
});
