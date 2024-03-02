document.addEventListener('DOMContentLoaded', (event) => {
    let dragSrcEl = null;
  
    function handleDrop(e) {
      e.stopPropagation(); 
  
      if (this.parentNode.classList.contains('container_animals')) {
        if (dragSrcEl.getAttribute('data-animal') === this.getAttribute('data-animal')) {
          alert('Success');
          
        } else {
          alert('Failure');
        }
      }
  
      return false;
    }
  
    function handleDragStart(e) {
      this.style.opacity = '0.4';
      dragSrcEl = this;
  
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }
  
    function handleDragEnd(e) {
      this.style.opacity = '1';
      items.forEach(function (item) {
        item.classList.remove('over');
      });
    }
    
    let items = document.querySelectorAll('.container .box');
  
    function handleDragOver(e) {
      e.preventDefault(); 
      return false;
    }
  
    function handleDragEnter(e) {
      if (this.parentNode.classList.contains('container_animals')) {
        this.classList.add('over');
      }
    }
  
    function handleDragLeave(e) {
      this.classList.remove('over');
    }
  
    let dragItems = document.querySelectorAll('.container .box');
    dragItems.forEach(function(item) {
      item.addEventListener('dragstart', handleDragStart, false);
      item.addEventListener('dragend', handleDragEnd, false);
    });
  
    let dropTargets = document.querySelectorAll('.container_animals .square');
    dropTargets.forEach(function(target) {
      target.addEventListener('dragover', handleDragOver, false);
      target.addEventListener('dragenter', handleDragEnter, false);
      target.addEventListener('dragleave', handleDragLeave, false);
      target.addEventListener('drop', handleDrop, false);
    });
  });