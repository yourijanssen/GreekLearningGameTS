import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export class NavigationService {
  constructor(private router: AppRouterInstance) {}

  navigateToGame(gamePath: string): void {
    this.router.push(gamePath);
  }

  navigateToNumbers(): void {
    this.navigateToGame("/games/numbers");
  }

  navigateToAlphabet(): void {
    this.navigateToGame("games/alphabet");
  }
}
