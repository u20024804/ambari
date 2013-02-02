/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var App = require('app');

/**
 * @class
 * 
 * This is a view for showing cluster memory metrics
 * 
 * @extends App.ChartLinearTimeView
 * @extends Ember.Object
 * @extends Ember.View
 */
App.ChartClusterMetricsMemory = App.ChartLinearTimeView.extend({
  id: "cluster-metrics-memory",
  url: function () {
    return App.formatUrl(
      this.get('urlPrefix') + "?fields=metrics/memory[{fromSeconds},{toSeconds},{stepSeconds}]",
      {},
      "/data/cluster_metrics/memory_1hr.json"
    );
  }.property('clusterName').volatile(),

  title: Em.I18n.t('dashboard.clusterMetrics.memory'),
  yAxisFormatter: App.ChartLinearTimeView.BytesFormatter,
  renderer: 'line',
  transformToSeries: function (jsonData) {
    var seriesArray = [];
    if (jsonData && jsonData.metrics && jsonData.metrics.memory) {
      for ( var name in jsonData.metrics.memory) {
        var displayName = name;
        var seriesData = jsonData.metrics.memory[name];
        if (seriesData) {
          seriesArray.push(this.transformData(seriesData, displayName));
        }
      }
    }
    return seriesArray;
  }
});