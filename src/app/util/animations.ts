import { animate, state, style, transition, trigger } from "@angular/animations";
export const borderToggle =  trigger('borderToggle', [
    state('inactive', style({
      borderColor: 'transparent',
      width: '0px',
    })),
    state('active', style({
      borderColor: '#888',  
      width: '400px',          
    })),
    transition('inactive <=> active', animate('300ms ease-in-out')) 
  ])

export const dropdownAnimation = trigger('dropdownAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-20px)' }),
      animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
    ])
  ])
export const hoverEffect1 =  trigger('hoverEffect1', [
    state('default', style({
      transform: 'scale(1)',
      boxShadow: 'none',
    })),
    state('hovered', style({
      transform: 'scale(1.01)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    })),
    transition('default <=> hovered', [
      animate('0.3s ease-in-out')
    ])
  ])

export const hoverEffect2 =  trigger('hoverEffect2', [
    state('default', style({
      transform: 'scale(1)',
      boxShadow: 'none',
    })),
    state('hovered', style({
      transform: 'scale(1.01)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    })),
    transition('default <=> hovered', [
      animate('0.3s ease-in-out')
    ])
  ])

  
 export const iconHover1 = trigger('iconHover1', [
    state('hidden', style({
      opacity: 0,
    })),
    state('visible', style({
      opacity: 1,
    })),
    transition('hidden <=> visible', [
      animate('300ms ease-in-out')
    ])
  ])
  export const backgroundHover1 =trigger('backgroundHover1', [
    state('normal', style({
      backgroundColor: 'transparent',
    })),
    state('hovered', style({
      backgroundColor: '#404040', 
    })),
    transition('normal <=> hovered', [
      animate('300ms ease-in-out')
    ])
  ])
 export const iconVisibility = trigger('iconVisibility', [
    state('hidden', style({
      opacity: 0,
    })),
    state('visible', style({
      opacity: 1,
    })),
    transition('hidden <=> visible', [
      animate('200ms ease-in-out')
    ])
  ])
 export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      animate('300ms', style({ opacity: 0 }))
    ])
  ])

