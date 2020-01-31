import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-navigtion',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
    /** TODO: Implement open/close side menu angular way */
    public shouldShowMenu: boolean;

    public onSideMenuClick(event): void {
        event.preventDefault();
        this.shouldShowMenu = true;
    }

    public closeMenu(): void {
        this.shouldShowMenu = !this.shouldShowMenu;
    }
}