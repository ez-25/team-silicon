/**
 * Web Audio API를 사용한 정렬 알고리즘 청각화 관리자
 */
export class AudioManager {
  private audioContext: AudioContext | null = null;
  private isEnabled = false;

  constructor() {
    this.initializeAudioContext();
  }

  /**
   * Audio Context 초기화
   */
  private initializeAudioContext(): void {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  /**
   * 오디오 활성화/비활성화
   */
  async setEnabled(enabled: boolean): Promise<void> {
    this.isEnabled = enabled;

    if (enabled && this.audioContext) {
      // 사용자 상호작용이 필요한 경우 오디오 컨텍스트 재개
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    }
  }

  /**
   * 값에 따른 주파수 계산
   */
  private valueToFrequency(
    value: number,
    minValue: number,
    maxValue: number,
  ): number {
    // 값을 주파수로 매핑 (200Hz ~ 800Hz)
    const minFreq = 200;
    const maxFreq = 800;
    const normalized = (value - minValue) / (maxValue - minValue);
    return minFreq + normalized * (maxFreq - minFreq);
  }

  /**
   * 비교 소리 재생
   */
  playCompareSound(
    valueA: number,
    valueB: number,
    minValue: number,
    maxValue: number,
  ): void {
    if (!this.isEnabled || !this.audioContext) return;

    const freqA = this.valueToFrequency(valueA, minValue, maxValue);
    const freqB = this.valueToFrequency(valueB, minValue, maxValue);

    // 두 음을 동시에 재생
    this.playTone(freqA, 0.1, 0.1);
    setTimeout(() => this.playTone(freqB, 0.1, 0.1), 50);
  }

  /**
   * 교환 소리 재생
   */
  playSwapSound(
    valueA: number,
    valueB: number,
    minValue: number,
    maxValue: number,
  ): void {
    if (!this.isEnabled || !this.audioContext) return;

    const freqA = this.valueToFrequency(valueA, minValue, maxValue);
    const freqB = this.valueToFrequency(valueB, minValue, maxValue);

    // 교환 소리 (더 강조된 톤)
    this.playTone(freqA, 0.15, 0.2);
    setTimeout(() => this.playTone(freqB, 0.15, 0.2), 100);
  }

  /**
   * 완료 소리 재생
   */
  playCompleteSound(value: number, minValue: number, maxValue: number): void {
    if (!this.isEnabled || !this.audioContext) return;

    const freq = this.valueToFrequency(value, minValue, maxValue);

    // 완료 소리 (더 긴 지속시간)
    this.playTone(freq, 0.3, 0.05);
  }

  /**
   * 톤 재생
   */
  private playTone(frequency: number, duration: number, volume: number): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(
      frequency,
      this.audioContext.currentTime,
    );
    oscillator.type = 'sine';

    // 볼륨 엔벨로프 (부드러운 페이드 인/아웃)
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume,
      this.audioContext.currentTime + 0.01,
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioContext.currentTime + duration,
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  /**
   * 모든 사운드 정지
   */
  stopAllSounds(): void {
    if (this.audioContext) {
      // 새로운 AudioContext를 생성하여 모든 소리 정지
      this.audioContext.close();
      this.initializeAudioContext();
    }
  }
}

// 싱글톤 인스턴스
export const audioManager = new AudioManager();
