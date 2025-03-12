import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  animations: [
    // Mobile menu animation
    trigger('menuAnimation', [
      state('open', style({
        height: '*',
        opacity: 1
      })),
      state('closed', style({
        height: '0',
        opacity: 0
      })),
      transition('closed <=> open', [
        animate('0.3s ease-in-out')
      ])
    ]),
    // Link animation
    trigger('linkAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-20px)', opacity: 0 }),
        animate('0.3s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ],
  template: `
    <!-- Mobile Navigation Bar -->
    <nav class="md:hidden fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div class="px-4">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo -->
          <div class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            InvoiceFlow
          </div>
          
          <!-- Mobile Menu Button -->
          <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300" 
                  (click)="toggleMobileMenu()">
            <div class="w-6 h-4 flex flex-col justify-between relative">
              <span class="w-full h-0.5 bg-gray-600 rounded-full transform transition-all duration-300"
                    [class.rotate-45]="isOpen"
                    [class.translate-y-1.5]="isOpen">
              </span>
              <span class="w-full h-0.5 bg-gray-600 rounded-full transition-opacity duration-300"
                    [class.opacity-0]="isOpen">
              </span>
              <span class="w-full h-0.5 bg-gray-600 rounded-full transform transition-all duration-300"
                    [class.-rotate-45]="isOpen"
                    [class.-translate-y-1.5]="isOpen">
              </span>
            </div>
          </button>
        </div>
        
        <!-- Mobile Dropdown Menu -->
        <div [@menuAnimation]="isOpen ? 'open' : 'closed'" 
             class="overflow-hidden">
          <div class="py-2 space-y-1">
            <a *ngFor="let link of links" 
               [href]="link.href"
               class="flex items-center px-4 py-2 text-gray-600 hover:bg-indigo-50 
                      hover:text-indigo-600 rounded-lg transition-all duration-300">
              <i class="mr-3 text-indigo-400" [ngClass]="link.icon"></i>
              {{ link.text }}
            </a>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Desktop Sidebar -->
    <div class="hidden md:block w-64 fixed left-0 top-0 h-full bg-white shadow-sm border-r border-gray-200 z-10">
      <!-- Sidebar Logo -->
      <div class="h-16 flex items-center px-6 border-b border-gray-100">
        <div class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          InvoiceFlow
        </div>
      </div>
      
      <!-- Sidebar Nav Links -->
      <div class="py-4">
        <a *ngFor="let link of links" 
           [href]="link.href"
           class="flex items-center px-6 py-3 text-gray-600 hover:bg-indigo-50 
                  hover:text-indigo-600 transition-all duration-300 group">
          <div class="flex items-center justify-center w-8 h-8 rounded-lg mr-3 
                     bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300">
            <i class="text-indigo-500" [ngClass]="link.icon"></i>
          </div>
          <span>{{ link.text }}</span>
        </a>
      </div>
      
      <!-- Footer with Settings -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <a href="#" class="flex items-center px-6 py-3 text-gray-600 hover:bg-indigo-50 
                hover:text-indigo-600 rounded-lg transition-all duration-300 group">
          <div class="flex items-center justify-center w-8 h-8 rounded-lg mr-3 
                     bg-gray-50 group-hover:bg-indigo-100 transition-colors duration-300">
            <i class="fas fa-sign-out-alt text-gray-500 group-hover:text-indigo-500"></i>
          </div>
          <span>Logout</span>
        </a>
      </div>
    </div>
    
    <!-- Content Wrapper -->
    <div class="md:pl-64 w-full">
      <!-- Mobile top spacing -->
      <div class="h-16 md:hidden"></div>
      
      <!-- Main Content -->
      <main class="w-full">
        <ng-content></ng-content>
      </main>
    </div>
  `
})
export class NavigationComponent {
  isOpen = false;
  links = [
    { text: 'Dashboard', href: '#', icon: 'fas fa-chart-line' },
    { text: 'Invoices', href: '/invoices', icon: 'fas fa-file-invoice' },
    { text: 'Clients', href: '#', icon: 'fas fa-users' },
    { text: 'Settings', href: '#', icon: 'fas fa-cog' }
  ];

  toggleMobileMenu() {
    this.isOpen = !this.isOpen;
  }
}