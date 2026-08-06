# Flickering Grid

> A flickering grid background made with Canvas, fully customizable using Tailwind CSS.

<component-viewer :component-files="["FlickeringGrid.vue"]" component-id="flickering-grid" config="FlickeringGridConfig" demo-file="FlickeringGridDemo.vue">
<template v-slot:api="">

## API

<table>
<thead>
  <tr>
    <th>
      Prop Name
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        squareSize
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        4
      </code>
    </td>
    
    <td>
      Size of each square in the grid.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        gridGap
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        6
      </code>
    </td>
    
    <td>
      Gap between squares in the grid.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        flickerChance
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        0.3
      </code>
    </td>
    
    <td>
      Probability of a square flickering.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        color
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      <code>
        rgb(0, 0, 0)
      </code>
    </td>
    
    <td>
      Color of the squares.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        width
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        -
      </code>
    </td>
    
    <td>
      Width of the canvas.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        height
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        -
      </code>
    </td>
    
    <td>
      Height of the canvas.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        class
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      <code>
        -
      </code>
    </td>
    
    <td>
      Additional CSS classes for the canvas.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        maxOpacity
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        0.2
      </code>
    </td>
    
    <td>
      Maximum opacity of the squares.
    </td>
  </tr>
</tbody>
</table>
</template>

<template v-slot:credits="">

- Credits to [magicui flickering-grid](https://magicui.design/docs/components/flickering-grid) for this component.

</template>
</component-viewer>
