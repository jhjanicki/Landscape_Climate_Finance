    const main = d3.select("body");
    const scrolly = d3.selectAll(".scroller");
    const figure = d3.selectAll(".chart");
    const article = d3.selectAll(".scroll-graphic");
    const step = d3.selectAll(".scene");

    // initialize the scrollama
    const scroller = scrollama();


    // console.log(figure.node().getBoundingClientRect())
    let width = figure.node().getBoundingClientRect().width;
    let height = figure.node().getBoundingClientRect().height;


    const margin = {
        "top": 30,
        "left": 50,
        "bottom": 50,
        "right": 30
    }


    //svg
    const svg = d3.select("#chart1").append("svg").attr("width", width).attr("height", height);
    const bg = svg.append('rect')
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill","#E7E6E6")
        .attr("opacity",0.3)

    
    const data = [{"year":2012,"value":364},{"year":2014,"value":365},{"year":2016,"value":463},{"year":2018,"value":547},{"year":2020,"value":632}];
    const data2=[{"year":2021,"value":3136},{"year":2022,"value":3196},{"year":2023,"value":3247},{"year":2024,"value":3321},{"year":2025,"value":3416},{"year":2026,"value":3624},{"year":2027,"value":3730},{"year":2028,"value":3851},{"year":2029,"value":3982},{"year":2030,"value":4134},{"year":2031,"value":4735},{"year":2032,"value":4967},{"year":2033,"value":5094},{"year":2034,"value":5210},{"year":2035,"value":5311},{"year":2036,"value":5411},{"year":2037,"value":5529},{"year":2038,"value":5631},{"year":2039,"value":5735},{"year":2040,"value":5842},{"year":2041,"value":5848},{"year":2042,"value":5852},{"year":2043,"value":5856},{"year":2044,"value":5861},{"year":2045,"value":5865},{"year":2046,"value":5869},{"year":2047,"value":5874},{"year":2048,"value":5878},{"year":2049,"value":5882},{"year":2050,"value":5887}];


    let xScale = d3.scaleLinear()
        .domain([2012,2020])
        .range([0, width - margin.left-margin.right]);

    let yScale = d3.scaleLinear()
        .domain([0, 700])
        .range([height-margin.bottom, 0]);
    
    const formatYear = function(d) {
        return d%2==0?((d-1).toString()+"/"+d.toString()):"";     
    }

    const formatYear2 = function(d) {
        return d;     
    }

    let xAxis = d3.axisBottom(xScale).tickFormat(formatYear);
    let yAxis = d3.axisLeft(yScale).ticks(5);


    const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);

    g.append("g")
        .attr("class", "y-axis")
        .call(yAxis);
    
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform",`translate(0,${height-margin.bottom})`)
        .call(xAxis);

    // Add the area
    g.append("path")
      .datum(data)
      .attr("class","area")
      .attr("fill", "#266FA5")
      .attr("fill-opacity", 1)
      .attr("stroke", "none")
      .attr("d", d3.area()
        .x(function(d) { return xScale(d.year) })
        .y0( height- margin.bottom)
        .y1(function(d) { return yScale(d.value) })
      );

    g.selectAll("circle.circles")
      .data(data)
      .join("circle")
      .attr("class","circles")
        .attr("fill", "black")
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("cx", function(d) { return xScale(d.year) })
        .attr("cy", function(d) { return yScale(d.value) })
        .attr("r", 5)

    
    g.selectAll("text.values")
      .data(data)
      .join("text")
      .attr("class","values")
        .attr("fill", "black")
        .attr("x", function(d) { return xScale(d.year) })
        .attr("y", function(d) { return yScale(d.value) })
        .attr("dx",0)
        .attr("dy",-8)
        .attr("font-weight",400)
        .attr("text-anchor",(d,i)=>(i==0)?"start":"middle")
        .text(d=>d.value)

    g.append("text")
        .attr("class","unit")
        .attr("x",-42)
        .attr("y",-12)
        .attr("font-weight",400)
        .attr("font-size",12)
        .text("$USD bn");



    // scrollama event handlers
    function handleStepEnter(response) {

        if (response.index == 0) {

            if( response.direction=="up"){

            yScale.domain([0, 700]);
            svg.select(".y-axis")
                .transition().duration(1000)
                .call(d3.axisLeft(yScale).ticks(5));

            svg.select(".area")
                .transition().duration(1000)
                .attr("d", d3.area()
                    .x(function(d) { return xScale(d.year) })
                    .y0( height- margin.bottom)
                    .y1(function(d) { return yScale(d.value) })
                )

            svg.selectAll("circle.circles")
                .transition().duration(1000)
                .attr("cx", function(d) { return xScale(d.year) })
                .attr("cy", function(d) { return yScale(d.value) })

            svg.selectAll("text.values")
                .transition().duration(1000)
                .attr("x", function(d) { return xScale(d.year) })
                .attr("y", function(d) { return yScale(d.value) })

            }
        }

        if (response.index == 1) {

            if( response.direction=="down"){

                yScale.domain([0, 7000]);
                svg.select(".y-axis")
                    .transition().duration(1000)
                    .call(d3.axisLeft(yScale).ticks(5));

                svg.select(".area")
                    .transition().duration(1000)
                    .attr("d", d3.area()
                        .x(function(d) { return xScale(d.year) })
                        .y0( height- margin.bottom)
                        .y1(function(d) { return yScale(d.value) })
                    )

                svg.selectAll("circle.circles")
                    .transition().duration(1000)
                    .attr("cx", function(d) { return xScale(d.year) })
                    .attr("cy", function(d) { return yScale(d.value) })

                svg.selectAll("text.values")
                    .transition().duration(1000)
                    .attr("x", function(d) { return xScale(d.year) })
                    .attr("y", function(d) { return yScale(d.value) })

            }

              
            if( response.direction=="up"){

                xScale.domain([2012, 2020]);
                svg.select(".x-axis")
                    .transition().duration(1000)
                    .call(d3.axisBottom(xScale).tickFormat(formatYear));

                svg.select(".area")
                    .transition().duration(1000)
                    .attr("d", d3.area()
                        .x(function(d) { return xScale(d.year) })
                        .y0( height- margin.bottom)
                        .y1(function(d) { return yScale(d.value) })
                    )

                svg.selectAll("circle.circles")
                    .transition().duration(1000)
                    .attr("cx", function(d) { return xScale(d.year) })
                    .attr("cy", function(d) { return yScale(d.value) })

                svg.selectAll("text.values")
                    .transition().duration(1000)
                    .attr("x", function(d) { return xScale(d.year) })
                    .attr("y", function(d) { return yScale(d.value) })

            }
         
        }

        if(response.index==2){

            if( response.direction=="up"){

                svg.selectAll(".area2")
                    .attr("d", d3.area()
                        .x(function(d) { return xScale(d.year) })
                        .y0( height- margin.bottom)
                        .y1(function(d) { return yScale(d.value)})
                        ).transition().duration(1000)
                        .attr("d", d3.area()
                        .x(function(d) { return xScale(d.year) })
                        .y0( height- margin.bottom)
                        .y1(height- margin.bottom)
                    ).remove();

                svg.selectAll(".line")
                    .attr("y2",yScale(3136))
                    .transition().duration(1000)
                    .attr("y2",yScale(632))
                    .remove();

            }

            if( response.direction=="down"){
                xScale.domain([2012, 2050]);
                    svg.select(".x-axis")
                    .transition().duration(1000)
                    .call(d3.axisBottom(xScale).tickFormat(formatYear2));

                svg.select(".area")
                    .transition().duration(1000)
                    .attr("d", d3.area()
                        .x(function(d) { return xScale(d.year) })
                        .y0( height- margin.bottom)
                        .y1(function(d) { return yScale(d.value) })
                    )

                svg.selectAll("circle.circles")
                    .transition().duration(1000)
                    .attr("cx", function(d) { return xScale(d.year) })
                    .attr("cy", function(d) { return yScale(d.value) })

                svg.selectAll("text.values")
                    .transition().duration(1000)
                    .attr("x", function(d) { return xScale(d.year) })
                    .attr("y", function(d) { return yScale(d.value) })
            }
        }

        if(response.index==3){

            if( response.direction=="down"){

                // Add the second area
                g.append("path")
                    .datum(data2)
                    .attr("class","area2")
                    .attr("fill", "#266FA5")
                    .attr("fill-opacity", 0.5)
                    .attr("stroke", "none")
                    .attr("d", d3.area()
                        .x(function(d) { return xScale(d.year) })
                        .y0( height- margin.bottom)
                        .y1(height- margin.bottom)
                        ).transition().duration(1000)
                        .attr("d", d3.area()
                        .x(function(d) { return xScale(d.year) })
                        .y0( height- margin.bottom)
                        .y1(function(d) { return yScale(d.value) })
                    );

                g.append("line")
                    .attr("class","line")
                    .attr("x1", xScale(2020))
                    .attr("x2",xScale(2021))
                    .attr("y1",yScale(632))
                    .attr("y2",yScale(632))
                    .transition().duration(1000)
                    .attr("y2",yScale(3136))
                    .attr("stroke","#266FA5")
                    .attr("stroke-width",3)
                    .attr("stroke-dasharray",5)

            }

        }

    }


    function handleStepExit(response) {
    }

    function init() {

        scroller
            .setup({
                step: ".scene",
                offset: 0.9,
                debug: false,
                progress: false
            })
            .onStepEnter(handleStepEnter);

    }

    init();