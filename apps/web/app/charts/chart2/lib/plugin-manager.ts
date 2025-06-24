import { SortingPlugin, SortingCallbacks } from '../types/sorting';

/**
 * 정렬 알고리즘 플러그인 관리자
 */
export class SortingPluginManager {
  private plugins: Map<string, SortingPlugin> = new Map();

  /**
   * 플러그인 등록
   */
  registerPlugin(plugin: SortingPlugin): void {
    if (!this.validatePlugin(plugin)) {
      throw new Error(`Invalid plugin: ${plugin.name}`);
    }
    this.plugins.set(plugin.name, plugin);
  }

  /**
   * 플러그인 목록 조회
   */
  getAvailablePlugins(): SortingPlugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * 특정 플러그인 조회
   */
  getPlugin(name: string): SortingPlugin | undefined {
    return this.plugins.get(name);
  }

  /**
   * 특정 플러그인 실행
   */
  async executeSort(
    pluginName: string,
    array: number[],
    callbacks: SortingCallbacks,
  ): Promise<void> {
    const plugin = this.plugins.get(pluginName);
    if (!plugin) {
      throw new Error(`Plugin not found: ${pluginName}`);
    }

    return plugin.sort([...array], callbacks);
  }

  /**
   * 플러그인 검증
   */
  private validatePlugin(plugin: SortingPlugin): boolean {
    // 필수 속성 확인
    if (!plugin.name || !plugin.sort) return false;

    // 정렬 함수 시그니처 확인
    if (typeof plugin.sort !== 'function') return false;

    // 메타데이터 확인
    if (!plugin.description || !plugin.complexity) return false;

    return true;
  }
}

// 싱글톤 인스턴스
export const sortingPluginManager = new SortingPluginManager();
