import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  animations: [
    // Fade in/out for mobile menu
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
    // Slide animation for nav links
    trigger('linkAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('0.3s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ],
  template: `
    <nav class="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Main Navigation -->
        <div class="flex justify-between h-16 items-center">
          <!-- Logo -->
          <div class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text 
                      hover:from-purple-600 hover:to-indigo-600 transition-all duration-300">
            InvoiceFlow
          </div>
          
          <!-- Desktop Menu -->
          <div class="hidden md:flex space-x-8">
            <a *ngFor="let link of links" 
               [@linkAnimation]
               [href]="link.href" 
               class="relative text-gray-600 hover:text-indigo-600 transition-colors duration-300
                      after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                      after:bg-indigo-600 after:transition-all after:duration-300
                      hover:after:w-full">
              {{ link.text }}
            </a>
           
          </div>
          
          <!-- Mobile Menu Button -->
          <button class="md:hidden group p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300" 
                  (click)="toggleMenu()">
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
        
        <!-- Mobile Menu -->
        <div [@menuAnimation]="isOpen ? 'open' : 'closed'" 
             class="md:hidden overflow-hidden">
          <div class="py-2 space-y-1">
            <a *ngFor="let link of links" 
               [href]="link.href"
               class="block px-4 py-2 text-gray-600 hover:bg-indigo-50 
                      hover:text-indigo-600 rounded-lg transition-all duration-300">
              {{ link.text }}
            </a>

          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavigationComponent {
  isOpen = false;
  links = [
    { text: 'Dashboard', href: '#' },
    { text: 'Invoices', href: '/invoices' },
   // { text: 'Clients', href: '#' },
    { text: 'Settings', href: '#' }
  ];

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}